"use client";


import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,

} from "flowbite-react";
import { formatDate } from "./ComponetesGrupo6/lib/formatters";
import { FileText, Calendar, Building2, User, CreditCard, Mail, Phone, MapPin } from "lucide-react"
import { getEstadoColor } from './ComponetesGrupo6/lib/formatters';

const ModalComponent = ({ openModal, setOpenModal, matricula }) => {


  return (
    <>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="flex justify-center items-center bg-white">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-semibold tracking-tight text-primary">
                {matricula.cod_matricula}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{formatDate(matricula.fecha)}</span>
              </div>
            </div>
            <span className={`px-2 py-1 text-xl font-medium rounded ${getEstadoColor(matricula.estado)}`}>
              {matricula.estado}
            </span>
          </div>
        </ModalHeader>
        <ModalBody className="bg-white">
          <div className="space-y-6">

            {/* Información del Predio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg from-primary to-accent shadow-sm">
                <Building2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-primary">Información del Predio</h3>
            </div>

            <div className="grid gap-4 rounded-lg border border-primary/20 bg-card/80 backdrop-blur-sm p-4 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <div className="text-sm font-medium text-muted-foreground">Tipo de Predio</div>
                  <div className="text-base font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {/* {matricula.predio.tipo} */}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm font-medium text-muted-foreground">ID del Predio</div>
                  <div className="text-base font-medium">#{matricula.id_predio}</div>
                </div>
              </div>

              

              <div className="space-y-1.5">
                <div className="text-sm font-medium text-muted-foreground">Dirección</div>
                <div className="text-base font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  {/* {matricula.predio.direccion || 'N/A'} */}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <div className="text-sm font-medium text-muted-foreground">Correo del Predio</div>
                  <div className="text-base break-all flex items-start gap-2">
                    <Mail className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <a
                      className="hover:text-accent hover:underline transition-colors"
                    >
                      {/* {matricula.predio.correo} */}
                    </a>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm font-medium text-muted-foreground">Teléfono del Predio</div>
                  <div className="text-base flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" />
                    <a
                      
                      className="hover:text-accent hover:underline transition-colors"
                    >
                     {/*  {matricula.predio.telefono} */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="alternative" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalComponent;