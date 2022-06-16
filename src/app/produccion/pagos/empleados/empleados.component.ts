import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import moment from 'moment';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  datoDeEmpleado: {
    fecha: string;
    hora_entrada: string;
    hora_de_salida: string;
    estado: boolean;
  }[] = [
    {
      fecha: '2022-06-02',
      hora_entrada: '08:15',
      hora_de_salida: '17:45',
      estado: true,
    },
    {
      fecha: '2022-06-03',
      hora_entrada: '08:15',
      hora_de_salida: '16:45',
      estado: true,
    },
    {
      fecha: '2022-06-04',
      hora_entrada: '08:15',
      hora_de_salida: '17:45',
      estado: true,
    },
    {
      fecha: '2022-06-05',
      hora_entrada: '08:15',
      hora_de_salida: '17:26',
      estado: true,
    },
    {
      fecha: '2022-06-06',
      hora_entrada: '08:15',
      hora_de_salida: '19:45',
      estado: true,
    },
  ];

  sumaDiasDeTrabajo: number = 0;

  horas: number = 0;
  minutos: number = 0;

  hotaCero = moment();

  constructor() {}

  ngOnInit(): void {
    /*     let primera:any = moment.duration('08:50')
    let segunda:any = moment.duration('17:00').subtract(primera)

    console.log(segunda.hours() + ":" + segunda.minutes()) */
  
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dayMaxEventRows: true,
    events: this.handleDateClick(),
  };

  ngAfterViewInit(): void {
    this.calendarOptions.eventChange
  }
  calcularEntreHoras(entro: string, salio: string) {
    
    let primero = moment.duration(entro);
    let segundo = moment.duration(salio).subtract(primero);

    this.sumaTotalDeHoras(segundo.hours(), segundo.minutes());
    this.horas += segundo.hours();
    return (
      segundo.hours() +
      ':' +
      (segundo.minutes() >= 0 && segundo.minutes() <= 9
        ? '0' + segundo.minutes()
        : segundo.minutes()) +
      'hs'
    );
  }
  result = moment.duration()


  sumaTotalDeHoras(hora: number, minuto: number) {

    this.result.add(hora, 'hours')

    //this.horas += hora;

    console.log(this.result.hours())


  }




  handleDateClick() {
    let events: any = [];

    this.datoDeEmpleado.map((e: any) => {
      this.sumaDiasDeTrabajo += 1;
      events.push({
        title: e.hora_entrada + ' hs' + ' Hora de entrada',
        date: e.fecha,
      });
      events.push({
        title: e.hora_de_salida + ' hs' + ' Hora de salida',
        date: e.fecha,
      });
    });

    return events;
  }

  consoleFecha(valor: any) {
    console.log(valor.value);
  }
}
