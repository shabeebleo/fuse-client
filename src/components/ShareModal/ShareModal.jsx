import { Modal, useMantineTheme } from '@mantine/core';
import PostShare from '../PostShare/PostShare';

function ShareModel({modalOpened,setModalOpened}) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='65%'
      opened={modalOpened }
      onClose={()=>{setModalOpened(false)}}
    >
     <PostShare/>
    </Modal>
  );
}
export default ShareModel 