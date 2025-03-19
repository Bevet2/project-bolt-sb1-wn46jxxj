export interface Genre {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  created_at: string;
}

export interface TrainingData {
  id: string;
  genre_id: string;
  file_path: string;
  processed: boolean;
  created_at: string;
}

export interface ModelVersion {
  id: string;
  genre_id: string;
  version: number;
  accuracy: number;
  status: 'training' | 'completed' | 'failed';
  created_at: string;
}