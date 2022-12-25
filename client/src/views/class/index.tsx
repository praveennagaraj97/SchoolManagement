import { FC, Fragment, useRef, useState } from 'react';
import { TfiBlackboard } from 'react-icons/tfi';
import useSWR, { mutate } from 'swr';
import { ClassEntity } from '../../@types';
import { Class } from '../../api-endpoints';
import PortalCenterSlideInOutAnimation from '../../components/animation/portal-center-slide-in-out';
import PortalSwipeInAndOut from '../../components/animation/portal-swipe-in-out';
import ClassForm from '../../components/class/class-form';
import ClassRoomCard from '../../components/class/class-room-card';
import ManageClassTeacherAndStudents from '../../components/class/manage-class-teacher-and-student';
import PortalContainer from '../../components/container/portal';
import Portal from '../../components/portal';
import PortalHeader from '../../components/portal/header';
import AccessDenied from '../../components/shared/access-denied';
import { useUserStore } from '../../context/userContext';
import useHandleClose from '../../hooks/useHandleClose';
import { ErrorTypes } from '../../hooks/useStatusMessageSetter';
import useWindowResize from '../../hooks/useWindowResize';
import { addClass, deleteClass, editClass } from '../../services/api.service';

const ManageClassView: FC = () => {
  const { role } = useUserStore();

  const [editData, setEditData] = useState<ClassEntity | null>(null);
  const [showAddNew, setShowAddNew] = useState(false);
  const formViewRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowResize(true);
  const [manageTeacherAndStd, setManageTeacherAndStd] =
    useState<ClassEntity | null>(null);

  useHandleClose(() => {
    setShowAddNew(false);
    setEditData(null);
  }, formViewRef);

  useHandleClose(() => {
    setManageTeacherAndStd(null);
  }, viewRef);

  async function add(data: Omit<ClassEntity, '_id' | 'teacher'>): Promise<{
    message: any;
    type: ErrorTypes;
  }> {
    try {
      await addClass(data);
      await mutate(Class);

      return {
        message: 'Class added successfully',
        type: 'success',
      };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || 'Something went wrong',
        type: 'error',
      };
    }
  }

  async function edit(data: Omit<ClassEntity, '_id' | 'teacher'>): Promise<{
    message: any;
    type: ErrorTypes;
  }> {
    try {
      await editClass(data, editData?._id!);
      await mutate(Class);

      return {
        message: 'Class details updated successfully',
        type: 'success',
      };
    } catch (error: any) {
      return {
        message: error?.response?.data?.message || 'Something went wrong',
        type: 'error',
      };
    }
  }

  const { data } = useSWR<{ results: ClassEntity[] }>(Class);

  if (role !== 'admin') {
    return <AccessDenied />;
  }

  async function handleDelete(id: string) {
    await deleteClass(id);
    await mutate(Class);
  }

  return (
    <Fragment>
      <div className="border-b pb-2 mb-6 flex justify-between space-x-2 items-center">
        <h1 className="text-xl">Manage Classes</h1>
        <button
          onClick={() => setShowAddNew(true)}
          className="action-btn py-1 px-4 flex space-x-2 items-center"
        >
          <TfiBlackboard />
          <span>Add Class</span>
        </button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {data?.results?.map((cls) => {
          return (
            <ClassRoomCard
              key={cls._id}
              {...cls}
              onDeleteClick={() => handleDelete(cls._id)}
              onUpdateClick={() => setEditData(cls)}
              onManageClick={() => setManageTeacherAndStd(cls)}
            />
          );
        })}
      </div>

      <Portal
        shouldDisableBackgroundScroll
        showModal={editData !== null || showAddNew}
      >
        <PortalContainer>
          <PortalCenterSlideInOutAnimation width={width}>
            <div
              ref={formViewRef}
              className="rounded-lg shadow-lg bg-slate-100 border p-2 drop-shadow-2xl"
            >
              <PortalHeader
                onClose={() => {
                  setShowAddNew(false);
                  setEditData(null);
                }}
                title={editData ? 'Edit Class' : 'Add Class'}
              />
              <hr className="my-2" />
              <ClassForm
                onSubmit={editData ? edit : add}
                data={editData}
                onComplete={() => {
                  setShowAddNew(false);
                  setEditData(null);
                }}
              />
            </div>
          </PortalCenterSlideInOutAnimation>
        </PortalContainer>
      </Portal>

      {/* Manage teacher and students */}
      <Portal
        shouldDisableBackgroundScroll={false}
        showModal={manageTeacherAndStd !== null}
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
                    setManageTeacherAndStd(null);
                  }}
                  title="Manage Class"
                />
              </div>
              <ManageClassTeacherAndStudents data={manageTeacherAndStd} />
            </div>
          </PortalSwipeInAndOut>
        </PortalContainer>
      </Portal>
    </Fragment>
  );
};

export default ManageClassView;
