# Grupo5-TP2-CellPhoneRep
Grupo5-TP2-CellPhoneRep

# Descripción
Los usuarios (as) podrán:
  - Se podrá autenticar.
  - Administrar  datos de la cuenta:
    - Domicilio.
    - Número celular.
    - Desactivar cuenta.
  - Solicitar una reserva para reparar su celular.
  - Seguimiento de la reparación por estado:
    - Pendiente: Estado inicial al registrar una reparación, se genera de forma automática al registrar la misma. 
    - Asignada: Se le asigna a un técnico que realizará la reparación. 
    - Realizada: El técnico finaliza la reparación. 
    - Finalizada: Entrega del celular al cliente y pago realizado.
    - Cancelada: Se cancela la reparación por parte del cliente y/o de la empresa.
  - Administrar la reserva:
    - Ver histórico de reservas.
    - Cancelar/Modificar su reserva (solo si está pendiente)

#Requerimientos mínimos


# Funcionalidades
  - ABM de Reservas:
    - Alta: Registro de la reparación. 
    - Baja: Se cancela la reparación.
    - Modificación: Se actualizan atributos de la solicitud registrada. 
  - ABM de Usuarios:
    - Alta: (Conectar con API Google)
    - Baja.
    - Modificación.

