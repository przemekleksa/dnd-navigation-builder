import Button from '../Button/Button';

const EmptyList = () => {
  const handleAdd = () => {
    console.log('click');
  };

  return (
    <div className="rounded-md bg-gray-50 text-center border border-gray-200 m-3 px-4 py-6">
      <div className="mb-6">
        <h2 className="text-primary-900 text-bold mb-1 font-semibold">
          Menu jest puste
        </h2>
        <p className="text-sm text-tertiary-600">
          W tym menu nie ma jeszcze żadnych linków
        </p>
      </div>
      <Button variant="withIcon" onClick={handleAdd}>
        Dodaj pozycję menu
      </Button>
    </div>
  );
};

export default EmptyList;
