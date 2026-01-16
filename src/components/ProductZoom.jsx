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
            src: product.images || product.image,
          },
          largeImage: {
            src: product.images || product.image,
            width: 1600,
            height: 1600,
          },
          enlargedImageContainerDimensions: {
            width: "100%",
            height: "100%",
          },
        }}
      />
        </div>
     
    </div>
  );
};

export default ProductZoom;
