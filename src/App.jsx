import axios from 'axios';
import { useForm } from 'react-hook-form';
import useUser from './useUser';

function App() {

  const [dbUser, isPending, refetch] = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/users', data);
      console.log(res);
      refetch();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  return (
    <>
    
    </>
  );
}

export default App;
