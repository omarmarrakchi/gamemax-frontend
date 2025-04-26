import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/user/services/login/authentification.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Interfaces remain the same
interface Reclamation {
  id_rec: number;
  clientId: number;
  typeRec: string;
  status: string;
  description: string;
  dateCreation?: string;
  attachments?: Attachment[]; // Keep this to know if attachments *might* exist
  adminResponse?: string;
}

interface Attachment {
  id: number;
  fileName: string;
  fileType: string;
  filePath: string;
}

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  submitted = false;
  reclamationForm: FormGroup;
  selectedFile?: File;
  message = '';
  showForm = false;
  actionType: 'add' | 'update' = 'add';
  reclamations: Reclamation[] = [];
  selectedRec?: Reclamation; // Store selected rec to check for potential attachments

  // Preview properties (keep as they are)
  previewUrl: SafeResourceUrl | null = null;
  showPreviewModal = false;
  currentFileType = '';

  // Upload preview properties (keep as they are)
  showUploadPreviewModal = false;
  uploadPreviewUrl: SafeResourceUrl | null = null;
  currentUploadFileType = '';

  constructor(
    private rs: ReclamationService,
    private authService: AuthenticationService,
    private sanitizer: DomSanitizer
  ) {
    this.reclamationForm = new FormGroup({
      typeRec: new FormControl('', Validators.required),
      status: new FormControl('OUVERT'),
      description: new FormControl('', Validators.required),
      removeAttachments: new FormControl(false) // *** MINIMAL CHANGE: Add control ***
    });
  }

  ngOnInit() {
    this.getReclamations();
    // No complex subscriptions needed
  }

  isImageFile(fileType: string | undefined): boolean {
    return fileType ? fileType.startsWith('image/') : false;
  }

  isPdfFile(fileType: string | undefined): boolean {
    return fileType === 'application/pdf';
  }

  showAddForm() {
    this.actionType = 'add';
    this.selectedRec = undefined;
    this.reclamationForm.reset({
      status: 'OUVERT',
      removeAttachments: false // *** MINIMAL CHANGE: Ensure reset ***
    });
    this.showForm = true;
    this.selectedFile = undefined;
    // this.selectedRecId = undefined; // No longer using selectedRecId
  }

  showUpdateForm(reclamation: Reclamation) {
    this.actionType = 'update';
    this.selectedRec = reclamation; // Store the selected reclamation
    // this.selectedRecId = reclamation.id_rec; // No longer using selectedRecId
    this.reclamationForm.patchValue({
      typeRec: reclamation.typeRec,
      status: reclamation.status,
      description: reclamation.description,
      removeAttachments: false // *** MINIMAL CHANGE: Reset on showing update form ***
    });
    this.showForm = true;
    this.selectedFile = undefined; // Clear file selection when starting update
  }

  cancelForm() {
    this.showForm = false;
    this.selectedRec = undefined;
    this.reclamationForm.reset({ // Ensure reset includes the new control
        status: 'OUVERT',
        removeAttachments: false
    });
    this.selectedFile = undefined;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.currentUploadFileType = this.selectedFile.type;
      // Optional: If they select a new file, uncheck remove (good UX but not minimal)
      // this.reclamationForm.get('removeAttachments')?.setValue(false);
    }
  }

  // previewUploadedFile() and closeUploadPreview() remain the same

  previewUploadedFile(): void {
    if (!this.selectedFile) return;

    this.closeUploadPreview();

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadPreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result);
      this.currentUploadFileType = this.selectedFile?.type || '';
      this.showUploadPreviewModal = true;
    };
     reader.onerror = (error) => {
       console.error("FileReader error:", error);
       this.message = "Erreur lors de la lecture du fichier pour l'aperçu.";
       this.closeUploadPreview();
     };

    if (this.isImageFile(this.selectedFile.type) || this.isPdfFile(this.selectedFile.type)) {
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.currentUploadFileType = this.selectedFile.type;
      this.showUploadPreviewModal = true;
    }
  }

  closeUploadPreview(): void {
    this.showUploadPreviewModal = false;
    if (this.uploadPreviewUrl) {
        const url = (this.uploadPreviewUrl as any).changingThisBreaksApplicationSecurity;
        if (typeof url === 'string' && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
        }
    }
    this.uploadPreviewUrl = null;
    this.currentUploadFileType = '';
  }


  save() {
    this.submitted = true;

    if (this.reclamationForm.invalid) {
      return;
    }

    const formValues = this.reclamationForm.getRawValue();

    if (this.actionType === 'add') {
      this.addReclamation(formValues);
    } else if (this.actionType === 'update' && this.selectedRec) { // Use selectedRec
      this.updateReclamation(this.selectedRec.id_rec, formValues);
    }
  }

  // addReclamation remains the same

  addReclamation(formValues: any) {
    const payload = {
      typeRec: formValues.typeRec,
      description: formValues.description,
      status: formValues.status || 'OUVERT'
    };
    this.rs.addRec(payload).subscribe({
      next: (res: any) => {
        this.message = 'Réclamation ajoutée avec succès !';
        if (this.selectedFile && res?.id_rec) {
          this.uploadAttachment(res.id_rec, () => {
             this.getReclamations();
             this.cancelForm();
          });
        } else {
           this.getReclamations();
           this.cancelForm();
        }
      },
      error: (err) => {
        console.error('Erreur serveur :', err);
        this.message = "Erreur lors de l'ajout de la réclamation.";
        this.submitted = false;
      }
    });
  }


  updateReclamation(id: number, formValues: any) {
    // Construct the payload
    const payload: any = {
      typeRec: formValues.typeRec,
      description: formValues.description,
      status: formValues.status // Include status if needed, or derive on backend
    };

    // *** MINIMAL CHANGE: Check the flag and modify payload ***
    if (formValues.removeAttachments) {
      payload.attachments = []; // Signal removal
    }
    // If not checked, the 'attachments' key is omitted, backend preserves existing.

    this.rs.updateRec(id, payload).subscribe({
      next: () => {
        this.message = 'Réclamation mise à jour avec succès !';
        // Upload NEW attachment logic (remains the same)
        if (this.selectedFile) { // Upload if a *new* file was selected
          this.uploadAttachment(id, () => {
            this.getReclamations(); // Refresh list after potential upload
            this.cancelForm();
          });
        } else {
          this.getReclamations(); // No new file, just refresh and cancel
          this.cancelForm();
        }
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la réclamation :', err);
        this.message = 'Erreur lors de la mise à jour de la réclamation.';
        this.submitted = false;
      }
    });
  }

  // uploadAttachment, getReclamations, removeRec remain the same

  private uploadAttachment(reclamationId: number, onComplete?: () => void) {
    if (!this.selectedFile) {
        onComplete?.();
        return;
    }

    this.rs.uploadAttachment(reclamationId, this.selectedFile).subscribe({
      next: (attachInfo) => {
        console.log('Fichier attaché avec succès:', attachInfo);
        onComplete?.();
      },
      error: (err) => {
        console.error("Erreur lors de l'upload du fichier :", err);
        this.message += " (Attention: Le nouveau fichier n'a pas pu être attaché)";
        onComplete?.();
      }
    });
  }

  getReclamations() {
    this.rs.getRecsByUser().subscribe({
      next: (res: Reclamation[]) => {
        this.reclamations = res;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des réclamations :', err);
        this.message = 'Erreur lors du chargement des réclamations';
      }
    });
  }

  removeRec(id_rec: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réclamation ?')) {
      this.rs.removeRec(id_rec).subscribe({
        next: () => {
          this.message = 'Réclamation supprimée avec succès';
          this.getReclamations();
           if (this.showForm && this.selectedRec?.id_rec === id_rec) {
             this.cancelForm();
           }
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la réclamation :', err);
          this.message = 'Erreur lors de la suppression';
        }
      });
    }
  }

  // previewAttachment and closePreview remain the same

  previewAttachment(attachment: Attachment) {
    this.currentFileType = attachment.fileType;
    this.rs.previewAttachment(attachment.id).subscribe({
      next: (blob) => {
        this.closePreview();
        const fileURL = URL.createObjectURL(blob);
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
        this.currentFileType = attachment.fileType;
        this.showPreviewModal = true;
      },
      error: (err) => {
        console.error('Preview error:', err);
        this.message = 'Preview non disponible pour ce fichier';
        this.closePreview();
      }
    });
  }

   closePreview() {
    this.showPreviewModal = false;
     if (this.previewUrl) {
        const url = (this.previewUrl as any).changingThisBreaksApplicationSecurity;
        if (typeof url === 'string' && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
        }
    }
    this.previewUrl = null;
    this.currentFileType = '';
  }
}