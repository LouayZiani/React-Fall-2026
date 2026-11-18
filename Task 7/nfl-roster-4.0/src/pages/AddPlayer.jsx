import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import AddPlayerForm from '../components/AddPlayerForm';

function AddPlayer() {
  useDocumentTitle('Add player');
  const navigate = useNavigate();

  return (
    <AddPlayerForm
      onAdded={(player) => navigate(`/players/${player.id}`, { state: { notice: `${player.name} was added.` } })}
      onCancel={() => navigate('/players')}
    />
  );
}

export default AddPlayer;
