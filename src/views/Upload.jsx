import {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';
import TextInput from '../components/ui/TextInput';

const Upload = () => {
  const initValues = {
    title: '',
    description: '',
  };
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };
  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');

      const fileResult = await postFile(file, token);

      const result = await postMedia(fileResult.data, inputs, token);

      navigate('/');
    } catch (e) {
      console.error(e.message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doUpload,
    initValues,
  );
  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          name="title"
          type="text"
          id="title"
          onChange={handleInputChange}
        />

        <TextInput
          label="Description"
          name="description"
          type="textarea"
          rows={5}
          id="description"
          onChange={handleInputChange}
        />

        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          className="rounded bg-amber-400 text-stone-700"
          type="submit"
          disabled={!(file && inputs.title?.length > 3)}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
