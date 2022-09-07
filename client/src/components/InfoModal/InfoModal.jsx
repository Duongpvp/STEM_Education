import { Group, Modal } from "@mantine/core";
import InfoIcon from "@mui/icons-material/Info";
import ProfileCard from "components/ProfileCard/ProfileCard";
import React, { useState } from "react";

const InfoModal = ({ user }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Modal
        transition="rotate-left"
        size="lg"
        centered
        transitionDuration={200}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        {user && <ProfileCard user={user} location={"chatPage"} />}
      </Modal>

      <Group position="center">
        <InfoIcon
          style={{ display: "flex", alignItems: "center", marginRight: "12px" }}
          fontSize="large"
          onClick={() => setOpened(true)}
        >
          Open Modal
        </InfoIcon>
      </Group>
    </div>
  );
};

export default InfoModal;
