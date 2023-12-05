'use client';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Container } from '@mui/material';
import { useState } from 'react';
import { VisuallyHiddenInput } from './components/VisuallyHiddenInput';

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files ? event.target.files[0] : null;
    setFile(newFile);
  };
  console.log(file);

  return (
    <>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          size='large'
          component='label'
          variant='contained'
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type='file'
            onChange={handleChangeFile}
            aria-hidden='true'
          />
        </Button>
      </Container>
    </>
  );
}
