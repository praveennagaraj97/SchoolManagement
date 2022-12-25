import { FC, Fragment, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { IoMdPerson } from 'react-icons/io';
import useSWR, { mutate } from 'swr';
import { StudentEntity, UserEntity } from '../../@types';
import { Student } from '../../api-endpoints';
import PortalSwipeInAndOut from '../../components/animation/portal-swipe-in-out';
import PortalContainer from '../../components/container/portal';
import Portal from '../../components/portal';
import PortalHeader from '../../components/portal/header';
import AccessDenied from '../../components/shared/access-denied';
import ConfirmModal from '../../components/shared/confirm-modal';
import StudentCard from '../../components/student/card';
import StudentForm from '../../components/student/form';
import { useUserStore } from '../../context/userContext';
import useHandleClose from '../../hooks/useHandleClose';
import { ErrorTypes } from '../../hooks/useStatusMessageSetter';
import useWindowResize from '../../hooks/useWindowResize';
import {
  addStudent,
  deleteStudent,
  editStudent,
} from '../../services/api.service';

const StudentsView: FC = () => {
  const { role } = useUserStore();
  const { data, isLoading } = useSWR<{ results: StudentEntity[] }>(Student);
  const [showAddNew, setShowAddNew] = useState(false);
  const { width } = useWindowResize(true);
  const viewRef = useRef<HTMLDivElement>(null);
  const [editData, setEditData] = useState<StudentEntity | null>(null);
  const [deleteID, setDeleteID] = useState<string | null>(null);

  useHandleClose(() => {
    setShowAddNew(false);
    setEditData(null);
  }, viewRef);

  if (role !== 'admin') {
    return <AccessDenied />;
  }

  async function add(
    payload: Omit<StudentEntity, 'user' | '_id'> &
      Omit<UserEntity, 'password' | '_id' | 'token'>
  ): Promise<{
    message: any;
    type: ErrorTypes;
  }> {
    try {
      await addStudent<StudentEntity>(payload);
      await mutate(Student);
      return {
        message: 'Student added successfully',
        type: 'success',
      };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || 'Something went wrong',
        type: 'error',
      };
    }
  }

  async function edit(
    payload: Omit<StudentEntity, 'user' | '_id'> &
      Omit<UserEntity, 'password' | '_id' | 'token'>
  ): Promise<{
    message: any;
    type: ErrorTypes;
  }> {
    try {
      await editStudent<StudentEntity>(payload, editData?._id!);
      await mutate(Student);
      return {
        message: 'Student details edited successfully',
        type: 'success',
      };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || 'Something went wrong',
        type: 'error',
      };
    }
  }

  async function onDeleteClick() {
    try {
      await deleteStudent(deleteID!);
      await mutate(Student);
      setDeleteID(null);
    } catch (error) {}
  }

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <ImSpinner2 size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="border-b pb-2 mb-6 flex justify-between space-x-2 items-center">
        <h1 className="text-xl">Manage Students</h1>
        <button
          className="action-btn py-1 px-4 flex space-x-2 items-center"
          onClick={() => setShowAddNew(true)}
        >
          <IoMdPerson />
          <span>Add Student</span>
        </button>
      </div>
      {!data?.results.length ? <h2>No Results found</h2> : ''}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {data?.results?.map((student) => {
          return (
            <StudentCard
              onEditClick={() => setEditData(student)}
              key={student._id}
              {...student}
              onDeleteClick={() => setDeleteID(student._id)}
            />
          );
        })}
      </div>
      <Portal
        shouldDisableBackgroundScroll={false}
        showModal={showAddNew || editData !== null}
      >
        <PortalContainer>
          <PortalSwipeInAndOut
            ref={viewRef}
            width={width}
            className="sm:w-auto w-full sm:top-0 right-0 
          bottom-0 bg-gray-50 rounded-l-xl shadow-2xl fixed border z-50 "
          >
            <div className="relative">
              <div className="p-2 border-b shadow-lg rounded-xl">
                <PortalHeader
                  onClose={() => {
                    setShowAddNew(false);
                    setEditData(null);
                  }}
                  title="Add Student"
                />
              </div>
              <StudentForm
                onComplete={() => {
                  setShowAddNew(false);
                  setEditData(null);
                }}
                onSubmit={editData ? edit : add}
                data={editData}
              />
            </div>
          </PortalSwipeInAndOut>
        </PortalContainer>
      </Portal>
      <ConfirmModal
        isAsync
        onConfirm={onDeleteClick}
        setShowModal={(state) => state && setDeleteID(null)}
        showModal={deleteID !== null}
        onCancel={() => setDeleteID(null)}
      />
    </Fragment>
  );
};

export default StudentsView;
