import { Component } from '@angular/core';
import { UploadService } from '../upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {

  isLoading = false;

  public datos: any = {
    nro_carta_porte: "",
    fecha: "",
    flete_pagador: "",
    chofer: "",
    mercaderia: "",
    peso_bruto: 0,
    peso_neto: 0,
    peso_tara: 0
  };

  constructor(private uploadService: UploadService) { }

  uploadFile(fileInput: any) {
    const file: File = fileInput.files[0];
    if (!file) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, selecciona un archivo primero.',
      });
      return;
    }
    if (file) {
      this.isLoading = true;
      this.uploadService.uploadFile(file).subscribe({
        next: (res: any) => {
          try {
            const d = res.entities;

            d.forEach((element: any) => {
              switch (element.type) {

                case "No_CPE":
                  this.datos.nro_carta_porte = element.mentionText;
                  break;
                case "Flete_Pagador":
                  this.datos.flete_pagador = element.mentionText;
                  break;
                case "Fecha":
                  this.datos.fecha = element.mentionText;
                  break;
                case "chofer":
                  this.datos.chofer = element.mentionText;
                  break;
                case "Peso_Bruto":
                  this.datos.peso_bruto = element.mentionText;
                  break;
                case "Peso_Neto":
                  this.datos.peso_neto = element.mentionText;
                  break;
                case "Peso_Tara":
                  this.datos.peso_tara = element.mentionText;
                  break;
                case "grano_especie":
                  this.datos.mercaderia = element.mentionText;
                  break;

              };
            });

            console.log(this.datos);
            this.isLoading = false;
            Swal.fire({
              icon: 'success',
              title: '¡Archivo procesado con éxito!',
              text: 'Tu archivo ha sido procesado.',
            });
          } catch (error) {

            this.isLoading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error al procesar el archivo',
              text: 'No sea podido reconocer el archivo como Carta de Porte',
            });
          }

        },
        error: (err: any) => {
          console.log(err);
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error al procesar el archivo',
            text: 'Ocurrió un error al procesar tu archivo. Intenta nuevamente.',
          });
        }
      });

      // this.uploadService.uploadFile(file).subscribe(
      //   (response) => {
      //     console.log(response);
      //     alert('Archivo procesado con éxito.');
      //   },
      //   (error) => {
      //     console.error('Error:', error);
      //     alert('Error al procesar el archivo.');
      //   }
      // );
    } else {
      alert('Por favor, selecciona un archivo primero.');
    }
  }
}
