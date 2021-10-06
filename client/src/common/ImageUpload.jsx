import styled from 'styled-components';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const props = {
   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
   listType: 'picture',
   beforeUpload(file) {
      return new Promise(resolve => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => {
            const img = document.createElement('img');
            img.src = reader.result;
            img.onload = () => {
               const canvas = document.createElement('canvas');
               canvas.width = img.naturalWidth;
               canvas.height = img.naturalHeight;
               const ctx = canvas.getContext('2d');
               ctx.drawImage(img, 0, 0);
               ctx.fillStyle = 'red';
               ctx.textBaseline = 'middle';
               ctx.font = '33px Arial';
               ctx.fillText('Ant Design', 20, 20);
               canvas.toBlob(resolve);
            };
         };
      });
   },
};

const Container = styled.div``;

const ImageUpload = () => {
   return (
      <Container>
         <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
         </Upload>
      </Container>
   );
};

export default ImageUpload;
