import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavCicloVida } from '../../utils/ionic/nav/nav-ciclo-vida';
import { EscolhaPage } from '../escolha/escolha';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavCicloVida {

  public carros: Carro[];
  ionViewDidLoad() {
    let loadding = this.loadingCrtl.create({ content: 'Aguarde o carregamento dos carros...' });
    loadding.present();
    this.carroService.lista()
      .subscribe(
        (carros) => {
          this.carros = carros;
          loadding.dismiss();
        }, (err: HttpErrorResponse) => {
          loadding.dismiss();
          this.alertCrtl.create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possível carregar a lista de Carros',
            buttons: [{
              text: 'OK'
            }]

          }).present();
        }
      );
  }
  constructor(public navCtrl: NavController, private carroService: CarrosServiceProvider,
    private loadingCrtl: LoadingController, private alertCrtl: AlertController) {

  }

  selecionarCarro(carro: Carro){
     this.navCtrl.push(EscolhaPage.name,{
       carroSelecionado:carro
     });
  }

}
