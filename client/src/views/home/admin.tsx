import { FC } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { TfiBlackboard } from 'react-icons/tfi';
import useSWR from 'swr';
import { Class, Student, Teacher } from '../../api-endpoints';
import OverviewCard from '../../components/home/info-card';

const AdminView: FC = () => {
  const { data: classCount } = useSWR<{ count: number }>(Class + '/count');
  const { data: teacherCount } = useSWR<{ count: number }>(Teacher + '/count');
  const { data: studentCount } = useSWR<{ count: number }>(Student + '/count');

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      <OverviewCard
        icon={<TfiBlackboard size={24} />}
        link="/class"
        title={`${classCount?.count || 0} Classes`}
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, incidunt sit. Similique illo velit magnam, nihil impedit delectus consequuntur obcaecati."
        btnName="Manage Classes"
      />
      <OverviewCard
        icon={<FaChalkboardTeacher size={24} />}
        link="/teacher"
        title={`${teacherCount?.count || 0} Teacher${
          (teacherCount?.count || 0) > 1 ? 's' : ''
        }`}
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, incidunt sit. Similique illo velit magnam, nihil impedit delectus consequuntur obcaecati."
        btnName="Manage Teachers"
      />
      <OverviewCard
        icon={<IoMdPerson size={24} />}
        link="/student"
        title={`${studentCount?.count || 0} Student${
          (studentCount?.count || 0) > 1 ? 's' : ''
        }`}
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, incidunt sit. Similique illo velit magnam, nihil impedit delectus consequuntur obcaecati."
        btnName="Manage Students"
      />
    </div>
  );
};

export default AdminView;
