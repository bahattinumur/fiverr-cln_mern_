import { useSearchParams } from "react-router-dom";

const FilterArea = () => {
  const [params, setParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const min = e.target[0].value;
    const max = e.target[1].value;

    params.set("min", min);
    params.set("max", max);

    setParams(params);
  };

  return (
    <div className="flex justify-between items-center gap-2 mb-8">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label>Budget</label>
        <input
          className="max-md:w-1/4 border px-2 py-1 rounded-md"
          placeholder="min"
          type="number"
        />
        <input
          className="max-md:w-1/4 border px-2 py-1 rounded-md"
          placeholder="max"
          type="number"
        />
        <button className="bg-green-500 text-white text-xs font-semibold p-2 rounded-md transition hover:bg-green-600">
          Filter
        </button>
      </form>

      <div className="flex items-center gap-2">
        <label>Sort By</label>
        <select>
          <option value="">Best Seller</option>
          <option value="">Most Popular</option>
          <option value="">Cheapest</option>
        </select>
      </div>
    </div>
  );
};

export default FilterArea;
