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
    - Realizada: Se realiza la reparación y el cliente retira su equipo reparado. (opcional)
    - Cancelada: Se cancela la reparación por parte del cliente y/o de la empresa. (opcional)
  - Administrar la reserva: (opcional)
    - Ver histórico de reservas.
    - Cancelar/Modificar su reserva (solo si está pendiente)

# Funcionalidades
    - ABM de Usuarios:
      - Alta, Baja (desactivar) y Modificación.
    - ABM de Reservas: (opcional)
      - Alta: Registro de la reparación. 
      - Baja: Se cancela la reparación.
      - Modificación: Se actualizan atributos de la solicitud registrada. 

# Entidades
>Usuario:
  - Id: se autogenera
  - Nombre Completo (fullName): cadena
  - Teléfono (phone): cadena
  - Email (email): cadena
  - Password (password): bcrypt
  - Cuenta Activa (activeAccount): control de cuenta activa o inactiva, booleano
 >Reserva:
  - Id: se autogenera
  - Usuario (user)
  - Celular (phone): lista de selección simple, colección en mongodb
      - Id
      - Nombre (name)
      - Costo (cost): número
  - Reparaciones (itemsRepairs): lista de selección múltiple, colección en mongodb
      - Id
      - Nombre (name)
      - Costo (cost): número
  - Sucursal (office): lista de selección simple, colección en mongodb
      - Id
      - Nombre
      - Domicilio 
      - Teléfono
  - Fecha Entrega (date): cadena
  - Comentario Adicional (additionalComment): opcional carga por el cliente, cadena
  - Estado (state): cadena
  - Costo Estimado de Reparación (estimatedRepairCost)(opcional): número
