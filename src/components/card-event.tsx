import { useNavigate } from "react-router-dom";

interface CardEventProps {
  id: string;
  title: string;
  location: string;
  date: string;
  img: string;
  price: string;
}

export function CardEvent(props: CardEventProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/ateendee/${props.id}`)}
      className="flex p-4 gap-4 border border-zinc-400/50 rounded-lg transform hover:bg-zinc-100/5 transition duration-500 hover:scale-105"
    >
      <img className="size-52" src={props.img} />
      <div className="flex flex-col justify-between">
        <div className="flex-col">
          <h2 className="text-2xl">{props.title}</h2>
          <p className="text-base text-zinc-400">{props.date}</p>
          <p className="text-base text-zinc-400">{props.location}</p>
        </div>
        <span className="text-2xl">A partir de R${props.price}</span>
      </div>
    </div>
  );
}
