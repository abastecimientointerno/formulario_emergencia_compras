# Formulario Compras de Emergencia
Gestión ágil de solicitudes de compras de emergencia en entornos operativos.

## Características

- **Formulario Principal**: Captura datos del solicitante como nombre, email, área, unidad operativa y planta/embarcación.
- **Artículos Dinámicos**: Permite añadir y eliminar artículos con validación de campos obligatorios.
- **Fecha Informativa**: Muestra la fecha actual automáticamente.
- **Diálogo de Confirmación**: Notifica el envío exitoso con el ID del ticket y una animación de un pez.
- **Integración con SharePoint**: Almacena solicitudes para su gestión por parte de los compradores.
- **Notificación por Correo**: El usuario recibe un email con los detalles de su solicitud.
- **Vista Kanban**: Los compradores gestionan los tickets directamente desde SharePoint.
- **Animaciones**: Efectos visuales suaves mediante `framer-motion`.
- **Validación de Formularios**: Implementada con `react-hook-form`.

## Tecnologías Utilizadas

- **React 18** — Framework principal de frontend
- **Material-UI** — Componentes estilizados modernos
- **Framer Motion** — Librería para animaciones fluidas
- **React Hook Form** — Validación y manejo eficiente de formularios
- **Axios** — Cliente HTTP para interacción con el backend
- **Power Automate** — Automatización de flujos y procesamiento de datos
- **SharePoint** — Plataforma para almacenamiento y gestión de tickets

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)
- Licencia activa de Microsoft Office 365 con acceso a SharePoint y Power Automate

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/abastecimientointerno/formulario_emergencia_compras.git
   cd emergency-purchase-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm start
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## Uso

1. **Acceso al Formulario**:
   - Los usuarios acceden a la aplicación e ingresan sus datos en el formulario principal.
   - Pueden añadir múltiples artículos especificando descripción, cantidad y prioridad.

2. **Envío de Solicitud**:
   - Al enviar el formulario, se valida que todos los campos obligatorios estén completos.
   - Una vez enviado, se muestra un diálogo de confirmación con el ID del ticket y una animación.

3. **Gestión de Tickets**:
   - Los compradores acceden a los tickets en SharePoint a través de una vista Kanban.
   - Pueden actualizar el estado de las solicitudes.

4. **Notificaciones**:
   - Los solicitantes reciben un correo con los detalles de su solicitud y el ID del ticket.

## Licencia

Este proyecto utiliza licencias para React (MIT) y Microsoft Office 365 (licencia comercial activa requerida para SharePoint y Power Automate).

## Contacto

Para soporte o consultas, contacta al equipo de desarrollo en:
- Email: abastecimientointerno@gmail.com
- GitHub Issues: [Formulario Compras de Emergencia Issues](https://github.com/abastecimientointerno/formulario_emergencia_compras/issues)