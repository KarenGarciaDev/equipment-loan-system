import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

export interface Reservation {
  id: number;
  userId: number;
  equipmentId: number;
  reservationDate: string;
  status: 'ACTIVE' | 'CANCELLED';
}


@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [];

  create(dto: CreateReservationDto): Reservation {
    const reservation: Reservation = {
      id: Date.now(),
      status: 'ACTIVE',
      ...dto,
    };

    this.reservations.push(reservation);
    return reservation;
  }

  findAll(): Reservation[] {
    return this.reservations;
  }

  cancel(id: number) {
    const reservation = this.reservations.find(r => r.id === id);
    if (!reservation) return { message: 'Reservation not found' };

    reservation.status = 'CANCELLED';
    return reservation;
  }
}
