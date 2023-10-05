import os
import shutil
import glob

input_folder_path = "C:/Users/jacks/Videos/Gizmo-output/Gizmo-input/Gizmo/Video"  # input folder path

video_extensions = [".mp4", ".mov", ".avi", ".wmv", ".flv", ".mkv", ".webm"]  # video extensions to compress
video_convert_to = "h264"  # video format to compress to

# get final word path inputFolderPath = Video
folder_name = os.path.basename(input_folder_path)

output_folder_path = "C:/Users/jacks/Videos/OUTPUT"  # output folder path

output_folder_path = os.path.join(output_folder_path, folder_name)

print(f"Compressing videos in {input_folder_path}...")

# Create "output" folder if it doesn't exist
if not os.path.exists(output_folder_path):
    os.makedirs(output_folder_path)

# Traverse the input folder recursively and compress all video files with specified extensions
for dirpath, dirnames, filenames in os.walk(input_folder_path):
    for filename in filenames:
        extname = os.path.splitext(filename)[1]
        if extname.lower() in video_extensions:
            # Increment the total count of videos
            # total_files_count["video"] += 1

            # Convert the video to the specified format and save it in the corresponding subfolder of the output folder
            rel_dirpath = os.path.relpath(dirpath, input_folder_path)
            subfolder_path = os.path.join(output_folder_path, rel_dirpath)
            if not os.path.exists(subfolder_path):
                os.makedirs(subfolder_path)

            input_file_path = os.path.join(dirpath, filename)
            output_file_path = os.path.join(
                subfolder_path,
                f"{os.path.splitext(filename)[0]}.{video_convert_to}",
            )

            print(f"Converting {input_file_path} to {output_file_path}...")

            # Run the FFmpeg command
            os.system(f'ffmpeg -i "{input_file_path}" -c:v libx264 "{output_file_path}"')
