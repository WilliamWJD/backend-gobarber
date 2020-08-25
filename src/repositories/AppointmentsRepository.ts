import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// DATA TRANSFER OBJECT
interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    // NÃO PERMITE A CRIAÇÃO DE UM AGENDAMENTO NO MESMO HORÁRIO
    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointment || null;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });
        this.appointments.push(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;