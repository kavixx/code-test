import EmployeeView from '../src/components/EmployeeView';

export default function Home() {
  return (
    <>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-medium self-center mt-5'>
          Employee Management
        </h1>
        <EmployeeView />
      </div>
    </>
  );
}
