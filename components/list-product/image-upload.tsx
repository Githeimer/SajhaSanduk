import { CldUploadWidget } from 'next-cloudinary';
import {Button} from '@/components/ui/button'

const uploadImages =()=>
{
    return(
<CldUploadWidget uploadPreset="products">
  {({ open }) => {
    return (
      <Button onClick={() => open()}>
        Upload Image
      </Button>
    );
  }}
</CldUploadWidget>
    )
}
export default uploadImages
