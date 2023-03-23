import { Component, OnInit } from '@angular/core';
import { BusesService } from 'src/app/services/buses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-buses',
  templateUrl: './edit-buses.component.html',
  styleUrls: ['./edit-buses.component.css']
})
export class EditBusesComponent implements OnInit {

  vBusDetails: any;
  vBusList: any;

  constructor(private busService: BusesService) { }

  ngOnInit(): void {
    this.viewBus();
  }

  viewBus() {
    let id = window.location.pathname.split("/").pop();

    this.busService.viewBus(id).subscribe(data => {
      this.vBusDetails = data;
      this.vBusList = this.vBusDetails.results;
      console.log(this.vBusList);
    });
  }

  updateNewBus(event) {
    event.preventDefault();
    const target = event.target

    const vnum = target.querySelector(".vnum").value
    const dname = target.querySelector(".dname").value
    const cname = target.querySelector(".cname").value
    const phone = target.querySelector(".phone").value
    const route = target.querySelector(".route").value
    const dt = target.querySelector(".dt").value
    const at = target.querySelector(".at").value
    const availability = target.querySelector(".availability:checked").value

    let id = window.location.pathname.split("/").pop();

    const [rdt, rat] = route.split(" - ");


    if (vnum == "") {
      Swal.fire({
        title: "Vehicle Number Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (dname == "") {
      Swal.fire({
        title: "Driver Name Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (cname == "") {
      Swal.fire({
        title: "Conductor Name Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (phone == "") {
      Swal.fire({
        title: "Phone Number Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (route == "") {
      Swal.fire({
        title: "Route Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else if (dt == "") {
      Swal.fire({
        title: "Departure Time Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    }
    else if (at == "") {
      Swal.fire({
        title: "Arrival Time Should Not Be Empty",
        icon: "warning",
        iconColor: "#FFA500",
        confirmButtonColor: "green",
        confirmButtonText: "Ok",
      });
    } else {
      this.busService.editBus(id, vnum, dname, cname, phone, route, dt, at, availability).subscribe(data => {
        Swal.fire({
          title: "Bus Updated Successfully",
          icon: "success",
          iconColor: "green",
          confirmButtonColor: "green",
          confirmButtonText: "Ok",
        }).then(function () {
          window.location.href = "http://localhost:4200/dashboard";
        });
        console.log(data);
      });
    }
  }

}
