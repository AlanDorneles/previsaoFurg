import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import logoFurg from '../../../public/logo-furg.png'


export const customMarkerIcon = L.icon({
  iconUrl: logoFurg,
  iconSize: [20, 20],
});

// Substitua os ícones padrão para o ícone personalizado
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});