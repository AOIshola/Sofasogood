import { range } from "../utils/range";
import './testimonial.css';

const StarRating = ({ rating }) => {
    const TOTAL = 5;
    return (
        <div style={{
            width: "fit-content", height: "20px", display: "flex"
        }}>

            {range(rating).map(() => (
                <img
                    key={crypto.randomUUID()}
                    src="https://sandpack-bundler.vercel.app/img/gold-star.svg"
                    alt="Star"
                    title={`Rating: ${rating}`}
                    className="star"
                />
            ))}
            {range(TOTAL - rating).map(() => (
                <img
                    key={crypto.randomUUID()}
                    src="/images/Star.png"
                    alt="Star"
                    className="star"
                />
            ))}
        </div>
    )
}

export default StarRating;