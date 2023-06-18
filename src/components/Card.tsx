import { CldImage } from 'next-cloudinary';
import { StarIcon } from '@heroicons/react/24/outline';

interface Props {
    product: any
}

const Card = ({ product }: Props) => {
    const { image, name, price, priceType } = product;

    const handleFavorite = () => {

    };

    const handleBuy = async () => {

    };

    return (
        <li className="bg-white border border-gray-100 rounded-lg shadow p-6 mb-4 flex flex-col items-center ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-200 hover:outline-none hover:ring-2" >
            <CldImage
                alt="Product"
                width="100"
                height="100"
                src={image}
            />
            <div className='flex flex-col items-center justify-between grow text-ellipsis' >

                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center" > {name} </h3>
                <p className="text-gray-600 mb-4" > {`KES ${price} / ${priceType}`
                }</p>
                <div className="flex  items-center" >
                    <button
                        onClick={handleFavorite}
                        className="text-xs font-semibold rounded-md px-4 py-1 leading-none border-2 border-gray-800 hover:border-gray-900 text-gray-900"
                    >
                        <StarIcon className="block h-4 w-4" />
                    </button>
                    <button
                        onClick={handleBuy}
                        className="flex-1 ml-1 text-xs font-semibold rounded-md px-4 py-2 leading-none bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        Buy
                    </button>
                </div>
            </div>
        </li>
    )
};

export default Card
