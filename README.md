# Grupo5-TP2-CellPhoneRep
Grupo5-TP2-CellPhoneRep

# Descripción
Los usuarios (as) podrán:
  - Autenticar.
  - Administrar  datos de la cuenta:
    - Domicilio.
    - Número celular.
    - Desactivar cuenta.
  - Solicitar una reserva para reparar su celular.
  - Seguimiento de la reparación por estado:
    - Pendiente: Estado inicial al registrar una reparación, se genera de forma automática al registrar la misma. 
    - Asignada: Se le asigna día de reserva para entregar el celular. 
        - Endpoint para cambiar estado de reparación. (opcional)
    - Realizada: El técnico finaliza la reparación. (opcional)
    - Finalizada: Entrega del celular al cliente y pago realizado. (opcional)
    - Cancelada: Se cancela la reparación por parte del cliente y/o de la empresa. (opcional)
  - Administrar la reserva: (opcional)
    - Ver histórico de reservas.
    - Cancelar/Modificar su reserva (solo si está pendiente)

# Funcionalidades
    - ABM de Usuarios:
    - Alta: (Conectar con API Google)
    - Baja.
    - Modificación.
  - ABM de Reservas: (opcional)
    - Alta: Registro de la reparación. 
    - Baja: Se cancela la reparación.
    - Modificación: Se actualizan atributos de la solicitud registrada. 


