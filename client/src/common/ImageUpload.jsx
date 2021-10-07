import styled from 'styled-components';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { message, Image } from 'antd';

const Container = styled.div`
   color: white;
`;

const ImageUpload = () => {
   const [image, setImage] = useState('');
   const [getImage, setGetImage] = useState();
   const [visible, setVisible] = useState(false);

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
            <h1 style={{ color: 'white' }}>Image</h1>
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
            <div key={item.id + index.toString()}>
               <Image
                  preview={{ visible: false }}
                  width={400}
                  src={item?.url}
                  onClick={() => setVisible(true)}
               />
               <div style={{ display: 'none' }}>
                  <Image.PreviewGroup
                     preview={{
                        visible,
                        onVisibleChange: vis => setVisible(vis),
                     }}
                  >
                     <Image src={item?.url} />
                  </Image.PreviewGroup>
               </div>
            </div>
         ))}
      </Container>
   );
};

export default ImageUpload;
