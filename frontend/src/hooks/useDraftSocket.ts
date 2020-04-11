import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DraftInfo, Role, ServerDraftEvent } from '@icm/shared/types';
import { JoinRoomMessage, SocketEvent } from '@icm/shared/socketTypes';

import { setDraftInfo, setCountdown, processServerEvent } from '../store/draftSlice';
import { RootState } from '../store';
import { getSocket, disconnectSocket } from '../socket';

const useDraftSocket = () => {
  const dispatch = useDispatch();
  const { name, draftToken, role } = useSelector(
    ({ data: { captainName }, drafts: { activeDraftToken, role } }: RootState) => ({
      name: captainName as string,
      draftToken: activeDraftToken as string,
      role: role as Role,
    }),
  );

  useEffect(() => {
    const socket = getSocket();
    socket.on(SocketEvent.DRAFT_INFO, (draftInfo: DraftInfo) => dispatch(setDraftInfo({ draftInfo })));
    socket.on(SocketEvent.COUNTDOWN, (countdown: number) => {
      dispatch(setCountdown({ countdown }));
    });
    socket.on(SocketEvent.SERVER_DRAFT_EVENT, (serverEvent: ServerDraftEvent) =>
      dispatch(processServerEvent(serverEvent)),
    );

    const message: JoinRoomMessage = {
      draftToken,
      name,
      role,
    };
    socket.emit(SocketEvent.JOIN, message);

    return disconnectSocket;
  }, [dispatch, draftToken, name, role]);
};

export default useDraftSocket;
