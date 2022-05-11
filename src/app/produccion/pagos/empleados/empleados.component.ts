import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  calendarOptions: CalendarOptions = {

    initialView: 'dayGridMonth',
    dayMaxEventRows: true,

    events: [
      { title: '8:00', date: '2022-05-01' },
      { title: '17:45', date: '2022-05-01'},
      { title: 'event 2', date: '2022-05-02' }
    ],
    eventClick:  this.handleDateClick.bind(this)
    
  };


  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }

}
