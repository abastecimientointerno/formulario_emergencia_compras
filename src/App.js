import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Divider,
  useMediaQuery,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ItemForm from './components/ItemForm';

const App = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [items, setItems] = useState([{}]);
  const [area, setArea] = useState('');
  const [unit, setUnit] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const generateTicketId = () => `ticket-${Math.floor(10000 + Math.random() * 90000)}`;

  const addItem = () => {
    setItems([...items, {}]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const onSubmit = async (data) => {
    const newTicketId = generateTicketId();
    const formData = {
      fecha_de_solicitud: new Date().toISOString().split('T')[0],
      nombre_del_solicitante: data.name,
      email_del_solicitante: data.email,
      area_del_solicitante: area,
      unidad_operativa: unit,
      planta_o_ep: data.plant,
      id_ticket: newTicketId,
      estado_ticket: 'Nuevo',
      items: items.map((item) => ({
        se_requiere_creacion_de_codigo_en_sap: item.requiresSapCode || '',
        codigo_sap_del_material: item.sapCode || '',
        descripcion_del_material: item.description || '',
        cantidad_requerida: parseInt(item.quantity) || 0,
        unidad_medida: item.unit || '',
        se_cuenta_con_reserva: item.hasReserve || '',
        se_cuenta_solped: item.hasSolped || '',
        tipo_de_averia: item.breakdownType || '',
        proveedor_sugerido: item.suggestedProvider || '',
      })),
      asignado_a: '',
      comentario_comprador: '',
    };

    try {
      const response = await axios.post('https://prod-13.brazilsouth.logic.azure.com:443/workflows/23469e42e13349368d1d4631ab5c08e8/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fkaK-S90bycAAjupSc9v5QA_9cY8VsvX13JGr4Vceos', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200 || response.status === 202) {
        setTicketId(newTicketId);
        setOpenDialog(true);
      } else {
        alert(`Error al enviar: ${response.status}`);
      }
    } catch (error) {
      alert(`Error de conexión: ${error.message}`);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
    setItems([{}]);
    setArea('');
    setUnit('');
  };

  const fishAnimation = {
    swim: {
      x: [0, 50, 0, -50, 0],
      rotate: [0, 10, 0, -10, 0],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, background: 'rgba(30, 30, 30, 0.8)' }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            color="primary"
            sx={{ 
              fontWeight: 'bold',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
              mb: 2 
            }}
          >
            Solicitud de Compra de Emergencia
          </Typography>
          <Divider sx={{ mb: 3, bgcolor: 'primary.main', height: 2 }} />
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ 
            mb: 3, 
            p: 2, 
            bgcolor: 'background.paper', 
            borderRadius: 1,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' 
          }}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              Fecha de solicitud:
            </Typography>
            <Typography variant="body1">{currentDate}</Typography>
          </Box>

          <TextField
            fullWidth
            label="Nombre del solicitante"
            {...register('name', { required: 'Campo obligatorio' })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 3 }}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 1 } }}
          />

          <TextField
            fullWidth
            label="Email del solicitante"
            {...register('email', {
              required: 'Campo obligatorio',
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: 'Email inválido',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 3 }}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 1 } }}
          />

          <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row', mb: 3 }}>
            <TextField
              select
              fullWidth
              label="Área del solicitante"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              error={!area && Object.keys(errors).length > 0}
              helperText={!area && Object.keys(errors).length > 0 ? 'Campo obligatorio' : ''}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 1 } }}
            >
              {['CCM', 'Mannto Flota', 'Mantto Pesca', 'Producción'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Unidad Operativa"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              error={!unit && Object.keys(errors).length > 0}
              helperText={!unit && Object.keys(errors).length > 0 ? 'Campo obligatorio' : ''}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 1 } }}
            >
              {['Pesca', 'Planta'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            fullWidth
            label="Planta o Embarcación pesquera"
            {...register('plant', { required: 'Campo obligatorio' })}
            error={!!errors.plant}
            helperText={errors.plant?.message}
            sx={{ mb: 4 }}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 1 } }}
          />

          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2, 
              bgcolor: 'background.paper', 
              borderLeft: '4px solid',
              borderColor: 'primary.main'
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom 
              color="primary"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontWeight: 'bold' 
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  p: 1,
                  borderRadius: 1,
                  mr: 1,
                  display: 'inline-flex'
                }}
              >
                Artículos
              </Box>
            </Typography>

            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 2, 
                    mb: 3, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Artículo #{index + 1}
                    </Typography>
                    {items.length > 1 && (
                      <IconButton 
                        onClick={() => removeItem(index)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                  <ItemForm
                    index={index}
                    item={item}
                    updateItem={updateItem}
                    removeItem={removeItem}
                    isLast={items.length === 1}
                  />
                </Paper>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addItem}
                fullWidth
                sx={{ 
                  mt: 2, 
                  mb: 3, 
                  py: 1.2,
                  borderRadius: 1,
                  borderWidth: 2
                }}
              >
                Añadir Artículo
              </Button>
            </motion.div>
          </Paper>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ 
                py: 1.8, 
                borderRadius: 1,
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
              }}
            >
              Enviar Solicitud
            </Button>
          </motion.div>
        </form>
      </Paper>

      {/* Diálogo de Confirmación */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{ 
          sx: { 
            borderRadius: 2, 
            p: 2,
            background: 'linear-gradient(135deg, #303030 0%, #212121 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          } 
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: 'success.main', textAlign: 'center', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 40, mr: 1 }} />
          </Box>
          ¡Solicitud Enviada con Éxito!
        </DialogTitle>
        <DialogContent>
          <Box 
            display="flex" 
            justifyContent="center" 
            mb={3}
            sx={{
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 2,
              p: 2
            }}
          >
            <motion.div
              variants={fishAnimation}
              animate="swim"
              style={{ fontSize: '60px' }}
            >
              🐟
            </motion.div>
          </Box>
          <Typography variant="body1" align="center" gutterBottom>
            Tu solicitud ha sido enviada correctamente.
          </Typography>
          <Box 
            sx={{ 
              bgcolor: 'background.paper', 
              p: 2, 
              borderRadius: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              ID de Solicitud:
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {ticketId}
            </Typography>
          </Box>
          <Typography variant="body2" align="center" color="text.secondary">
            En breve recibirás un correo de confirmación con la información enviada.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pt: 2, pb: 3 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
            sx={{ 
              px: 4,
              py: 1.2,
              borderRadius: 1,
              fontWeight: 'bold'
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;