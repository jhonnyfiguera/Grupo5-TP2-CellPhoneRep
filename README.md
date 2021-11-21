# Grupo5-TP2-CellPhoneRep
Grupo5-TP2-CellPhoneRep

# Descripción
Los usuarios (as) podrán:
  - Autenticar.
  - Administrar datos de la cuenta:
    - Nombre Completo.
    - Número celular.
    - Desactivar cuenta.
  - Solicitar una reserva para reparar su celular.
  - Seguimiento de la reparación por estado:
    - Pendiente: Estado inicial al registrar una reparación, se genera de forma automática al registrar la misma. 
    - Agendada: Se le asigna día de reserva para entregar el celular. 
        - Endpoint para cambiar estado de reparación y asignar fecha. (opcional)
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

# Entidades
Usuario:
  - Id: se autogenera
  - Nombre Completo (fullName): cadena
  - Teléfono (phone): cadena
  - Email (email): cadena
  - Password (password): bcrypt
  - Cuenta Activa (activeAccount): control de cuenta activa o inactiva, booleano
  - Lista De Reservas (??)--------------
Reserva:
  - Id: se autogenera
  - Usuario
  - Celular: lista para seleccionar, colección
      - Id
      - Nombre
      - Costo: número
  - Reparación: lista para de selección múltiple, colección
      - Id
      - Nombre
      - Costo: número
  - Sucursal: lista para seleccionar, colección
      - Id
      - Nombre
      - Domicilio 
      - Teléfono
  - Fecha Entrega: cadena
  - Comentario Adicional: opcional carga por el cliente, cadena
  - Estado: cadena
  - Costo Estimado de Reparación (opcional): número