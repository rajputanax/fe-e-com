// import "../pages/PageStyles/details.scss";
import ReactImageMagnify from "react-image-magnify";

const ProductZoom = ({ product }) => {
  return (
    <div className='magnifier '>
        <div className='product'>
 <ReactImageMagnify
        {...{
          smallImage: {
            alt: product.name,
            isFluidWidth: true,
            src: product.images ||product.image ,
          },
          largeImage: {
            src: product.images,
            width: 1800,
            height: 1800,
          },
          enlargedImageContainerDimensions: {
            width: "200%",
            height: "120%",
          },
        }}
      />
        </div>
     
    </div>
  );
};

export default ProductZoom;
