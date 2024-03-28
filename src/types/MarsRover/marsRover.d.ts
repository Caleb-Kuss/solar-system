export type Mars = {
  photos: [
    {
      id: number;
      sol: number;
      img_src: string;
      earth_date: string;
      camera: {
        id: number;
        name: string;
        rover_id: number;
        full_name: string;
      };
      rover: {
        id: number;
        name: string;
        landing_date: string;
        launch_date: string;
        status: string;
        max_sol: number;
        max_date: string;
        total_photos: number;
        cameras: [
          { name: string; full_name: string },
          { name: string; full_name: string },
          { name: string; full_name: string },
          { name: string; full_name: string },
          { name: string; full_name: string },
          { name: string; full_name: string },
          { name: string; full_name: string }
        ];
      };
    }
  ];
};

export type MarsPhoto = {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: [
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string }
    ];
  };
};

export type FavoriteMarsPhoto = {
  id: String;
  user: User;
  userId: String;
  marsRoverData: MarsPhoto;
  marsRoverDataId: String;
};

export type MarsRover = {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: [
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string },
      { name: string; full_name: string }
    ];
  };
};
