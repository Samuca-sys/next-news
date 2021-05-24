import { employeesApi } from '../services/api';

import styles from '../styles/EOM.module.css';
import { Toolbar } from '../components/toolbar';

export const EmployeeOfMonth = ({ employees }) => {
	return (
		<div className='page-container'>
			<Toolbar />
			<div className={styles.main}>
				<h1>Employee Of The Month</h1>
				{employees.map((employee) => {
					return (
						<div key={employee.name} className={styles.employeeOfTheMonth}>
							<h3>{employee.name}</h3>
							<h6>{employee.position}</h6>
							<img src={employee.image} alt={employee.name} />
							<p>{employee.description}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

//asynchronous function
export const getServerSideProps = async () => {
	// get api data
	const { data } = await employeesApi.get('employee');

	const employees = data.map((employee) => {
		return {
			name: employee.name,
			position: employee.position,
			description: employee.description,
			image: employee.image,
		};
	});

	// return props object
	return {
		props: {
			employees,
		},
	};
};

export default EmployeeOfMonth;
