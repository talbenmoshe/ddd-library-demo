import React, { FC, useState } from 'react';
import { Button, Typography } from 'antd';
import { useLibraryModel } from '../hooks/useLibraryModel';
import { EditOutlined } from '@ant-design/icons';
import { useLibraryFacade } from '../hooks/useLibraryFacade';
import { useReadableEventRefresher } from '@zdrbm/zdr-react';

const { Title } = Typography;

export const Welcome: FC = () => {
  const facade = useLibraryFacade();
  const library = useLibraryModel();
  const [isEditMode, setIsEditMode] = useState(false);
  const [[description]] = useReadableEventRefresher(library.description);
  // const description = library.description.get();
  let descriptionComponent = <Title level={3}>{description}</Title>;

  if (isEditMode) {
    descriptionComponent = (<input type='text' value={description} onChange={e => facade.changeLibraryDescription(e.target.value)} />);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title>{library.name.get()}</Title>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        {descriptionComponent}
        <Button
          shape='circle'
          icon={<EditOutlined />}
          onClick={() => {
            setIsEditMode(currentMode => !currentMode);
          }}
        />
      </div>
    </div>
  );
};