import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => <main>{children}</main>;

export default Layout;
