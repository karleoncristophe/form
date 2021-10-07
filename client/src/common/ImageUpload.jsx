import styled from 'styled-components';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { message } from 'antd';

const Container = styled.div`
   color: white;
`;

const ImageUpload = () => {
   //    const [uploadImage, setUploadImage] = useState('');
   const [image, setImage] = useState('');
   const [getImage, setGetImage] = useState();

   const uploadImage = async e => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('file', image);
      console.log(image);

      try {
         const { data } = await api.post('postImage', formData);
         console.log(data);
         message.success('Imagem enviada.');
      } catch (error) {
         message.error('Imagem não enviada.');
      }
   };

   useEffect(() => {
      const getImage = async () => {
         const { data } = await api.get('image');
         console.log(data);
         setGetImage(data);
      };
      getImage();
   }, []);

   return (
      <Container>
         <form
            onSubmit={uploadImage}
            style={{ display: 'flex', flexDirection: 'column' }}
         >
            <label htmlFor="">Image</label>
            <input
               type="file"
               name="image"
               onChange={e => setImage(e.target.files[0])}
            />
            <button type="submit" style={{ color: 'black' }}>
               salvar
            </button>
         </form>
         {getImage?.map((item, index) => (
            <img
               src={item?.url}
               alt=""
               key={item.id + index.toString()}
               style={{ height: '100px', width: '100px' }}
            />
         ))}
      </Container>
   );
};

export default ImageUpload;
