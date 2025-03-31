import React from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Divider
} from '@mui/material';

const ItemForm = ({ index, item, updateItem }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ mb: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              ¿Se requiere creación de código en SAP?
            </FormLabel>
            <RadioGroup
              row
              value={item.requiresSapCode || ''}
              onChange={(e) => updateItem(index, 'requiresSapCode', e.target.value)}
            >
              <FormControlLabel value="SI" control={<Radio color="primary" />} label="SI" />
              <FormControlLabel value="NO" control={<Radio color="primary" />} label="NO" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Código SAP del Material"
          value={item.sapCode || ''}
          onChange={(e) => updateItem(index, 'sapCode', e.target.value)}
          sx={{ mb: 2 }}
          variant="outlined"
          InputProps={{ sx: { borderRadius: 1 } }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Tipo de Avería"
          select
          value={item.breakdownType || ''}
          onChange={(e) => updateItem(index, 'breakdownType', e.target.value)}
          sx={{ mb: 2 }}
          variant="outlined"
          InputProps={{ sx: { borderRadius: 1 } }}
        >
          {['Mecánica', 'Eléctrica', 'Hidráulica', 'Neumática', 'Otro'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Descripción del Material"
          multiline
          rows={2}
          value={item.description || ''}
          onChange={(e) => updateItem(index, 'description', e.target.value)}
          sx={{ mb: 2 }}
          variant="outlined"
          InputProps={{ sx: { borderRadius: 1 } }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Cantidad Requerida"
          type="number"
          value={item.quantity || ''}
          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
          sx={{ mb: 2 }}
          variant="outlined"
          InputProps={{ sx: { borderRadius: 1 } }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Unidad de Medida"
          select
          value={item.unit || ''}
          onChange={(e) => updateItem(index, 'unit', e.target.value)}
          sx={{ mb: 2 }}
          variant="outlined"
          InputProps={{ sx: { borderRadius: 1 } }}
        >
          {['Unidad', 'Caja', 'Kg', 'Litro', 'Metro', 'Pieza'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          Información Adicional
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ mb: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              ¿Se cuenta con reserva?
            </FormLabel>
            <RadioGroup
              row
              value={item.hasReserve || ''}
              onChange={(e) => updateItem(index, 'hasReserve', e.target.value)}
            >
              <FormControlLabel value="SI" control={<Radio color="primary" />} label="SI" />
              <FormControlLabel value="NO" control={<Radio color="primary" />} label="NO" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ mb: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              ¿Se cuenta con SOLPED?
            </FormLabel>
            <RadioGroup
              row
              value={item.hasSolped || ''}
              onChange={(e) => updateItem(index, 'hasSolped', e.target.value)}
            >
              <FormControlLabel value="SI" control={<Radio color="primary" />} label="SI" />
              <FormControlLabel value="NO" control={<Radio color="primary" />} label="NO" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Proveedor Sugerido"
          value={item.suggestedProvider || ''}
          onChange={(e) => updateItem(index, 'suggestedProvider', e.target.value)}
          variant="outlined"
          InputProps={{ sx: { borderRadius: 1 } }}
        />
      </Grid>
    </Grid>
  );
};

export default ItemForm;