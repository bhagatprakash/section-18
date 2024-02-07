import MealItem from "./Meallitems.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);

  const { data, isLoading, error } = useHttp(
    "http://localhost:3001/meals",
    requestConfig,
    []
  );

  if (isLoading) {
    return <p className="center">Feaching meals....</p>;
  }

  if (error) {
    return <Error title="Faild to fetch meals" message={error} />;
  }

  // if (!data) {
  //   return <p></p>;
  // }

  // useEffect(() => {
  //   async function fetchMeals() {
  //     const responce = await fetch("http://localhost:3001/meals");

  //     if (!responce.ok) {
  //       // .........
  //     }

  //     const meals = await responce.json();
  //     setLoadedMeals(meals);
  //   }
  //   fetchMeals();
  // }, []);

  return (
    <ul id="meals">
      {data.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
