import React, { useState, forwardRef, useImperativeHandle } from "react";
import { SafeAreaView, View, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axiosClient from '../api/axiosClient';
import { Text, TextInput } from "../../global" 
const { width, height } = Dimensions.get('window');

interface VideoSubmissionScreen6Props {
    onContinue: (data: { videoUri?: string; stageImageUri?: string }) => void;
    onBack: () => void;
    progress: number;
}

const VideoSubmissionScreen6 = forwardRef(({ onContinue, onBack, progress }: VideoSubmissionScreen6Props, ref) => {
	const [videoUri, setVideoUri] = useState<string | null>(null);
	const [stageImageUri, setStageImageUri] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);

    const handleRecordVideo = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Sorry, we need camera permissions to record videos.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setVideoUri(result.assets[0].uri);
			console.log(videoUri);
            Alert.alert('Video Recorded', 'Your video has been recorded.');
        }
    };

    const handleUploadVideo = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Sorry, we need media library permissions to upload videos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setVideoUri(result.assets[0].uri);
			console.log(videoUri);
            Alert.alert('Video Uploaded', 'Your video has been uploaded.');
        }
    };

    const handleUploadStageImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Sorry, we need media library permissions to upload images.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.8,
        });

        if (!result.canceled) {
            setStageImageUri(result.assets[0].uri);
            Alert.alert('Image Uploaded', 'Your stage image has been uploaded.');
        }
    };

    const handleSubmitReview = async () => {
        if (!videoUri) {
            Alert.alert('Error', 'Please record or upload a video to submit.');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            
         

			formData.append('videoUri', {
  uri: videoUri,
  type: 'video/mp4',
  name: 'submission_video.mp4',
}as any);

if (stageImageUri) {
  formData.append('stageImageUri', {
    uri: stageImageUri,
    type: 'image/jpeg',
    name: 'stage_image.jpg',
  }as any);
}


            // Upload to backend
            await axiosClient.post('/campaigns/upload-stage6-media', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            onContinue({
                videoUri,
                stageImageUri: stageImageUri || undefined 
            });
        } catch (error: any) {
            Alert.alert('Upload Failed', error.response?.data?.msg || 'Failed to upload media');
        } finally {
            setUploading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        handleSubmitReview
    }));

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.column}>
				<View style={styles.column2}>
					<Text style={styles.text2}>
						{"Video\nSubmission"}
					</Text>
				</View>
				<View style={{ marginLeft: height*0.05 }}>
					{/* Heading */}
					<Text style={styles.uploadHeading}>
						Upload a video showing :
					</Text>

					{/* Bullet Points */}
					<Text style={styles.uploadBullet}>• Product unboxing (if possible)</Text>
					<Text style={styles.uploadBullet}>• Your usage setup (e.g., gaming desk, office, gym)</Text>
					<Text style={styles.uploadBullet}>• You speaking about your experience honestly</Text>
					<Text style={styles.uploadBullet}>• Close-up of product condition</Text>
				</View>

				<View style={styles.row2}>
					<TouchableOpacity style={styles.buttonColumn} onPress={handleRecordVideo}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/3i9co7be_expires_30_days.png"}}
							resizeMode = {"stretch"}
							style={styles.image2}
						/>
						<Text style={styles.text4}>
							{"Record Video"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.column3} onPress={handleUploadVideo}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/iP7Gigwvg3/i9qmr6ej_expires_30_days.png"}}
							resizeMode = {"stretch"}
							style={styles.image3}
						/>
						<Text style={styles.text4}>
							{"Upload Video"}
						</Text>
					</TouchableOpacity>
				</View>

				{/* Stage Image Upload Section */}
				{/* <View style={styles.stageImageSection}>
					<Text style={styles.stageImageTitle}>Stage Image (Optional)</Text>
					<TouchableOpacity style={styles.stageImageButton} onPress={handleUploadStageImage}>
						<Text style={styles.stageImageButtonText}>
							{stageImageUri ? "Change Stage Image" : "Upload Stage Image"}
						</Text>
					</TouchableOpacity>
					{stageImageUri && (
						<View style={styles.imagePreview}>
							<Image source={{ uri: stageImageUri }} style={styles.previewImage} />
							<Text style={styles.previewText}>Image uploaded successfully</Text>
						</View>
					)}
				</View> */}

				<View style={styles.column4}>
					<Text style={styles.text5}>
						{"Video Submission Guidelines"}
					</Text>
					<Text style={styles.text6}>
						{"1/ Make sure your face and product are clearly visible.\n2/ Speak clearly in a quiet environment.\n3/ Keep your phone steady and camera at eye level.\n4/ Share your honest opinion — no scripts needed.\n5/ Hold or show the product in the video if possible.\n6/ Mention product name → Pros → Cons → Suggestions → Overall rating.\n"}
					</Text>
				</View>
			</View>
		</SafeAreaView>
	)
});

export default VideoSubmissionScreen6;

const styles = StyleSheet.create({
	uploadHeading: {
		color: "#000",
		fontFamily: "Manrope",
		fontSize: 17,
		fontStyle: "normal",
		fontWeight: "700",
		lineHeight: 22,
		marginBottom: 6,
	},
	uploadBullet: {
		color: "#999",
		fontFamily: "Manrope",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "700",
		lineHeight: 14,
		marginBottom: 4,
	},
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	progressContainer: {
		width: width * 0.8,
		height: height * 0.01,
		backgroundColor: "#DAE5FF",
		borderRadius: 100,
		marginBottom: height * 0.04,
		marginHorizontal: width * 0.09,
	},
	progressBar: {
		height: '100%',
		backgroundColor: "#2C5FDD",
		borderRadius: 100,
	},
	buttonColumn: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderColor: "#00000008",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: height * 0.035,
		marginRight: width * 0.05,
		shadowColor: "#00000008",
		shadowOpacity: 0.0,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
	column: {
		marginBottom:height*0.002,
		backgroundColor: "#FFFFFF",
	},
	column2: {
		backgroundColor: "#FFFFFF",
		paddingTop: height * 0.04,
		paddingBottom: height * 0.02,
		marginBottom: height * 0.015,
	},
	column3: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderColor: "#00000008",
		borderRadius: 10,
		borderWidth: 1,
		paddingTop: height * 0.04,
		paddingBottom: height * 0.02,
		shadowColor: "#00000008",
		shadowOpacity: 0.0,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
	column4: {
		backgroundColor: "#DAE5FF4D",
		borderColor: "#00000008",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: height * 0.02,
		paddingHorizontal: width * 0.04,
		marginBottom: height * 0.1,
		marginHorizontal: width * 0.08,
	},
	image: {
		width: width * 0.07,
		height: height * 0.035,
		marginRight: width * 0.035,
	},
	image2: {
		height: height * 0.06,
		marginBottom: height * 0.007,
		width: width * 0.12,
		resizeMode: 'contain',
	},
	image3: {
		height: height * 0.06,
		marginBottom: height * 0.005,
		width: width * 0.12,
		resizeMode: 'contain',
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		paddingRight: width * 0.007,
		marginBottom: height * 0.05,
		marginLeft: width * 0.08,
	},
	row2: {
		flexDirection: "row",
		marginBottom: height * 0.03,
		marginHorizontal: width * 0.08,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	text: {
		color: "#000000",
		fontSize: width * 0.045,
		fontFamily: 'Poppins_500Medium',
	},
	text2: {
		color: "#000000",
		fontSize: width * 0.07,
		fontFamily: 'Poppins_700Bold',
		marginLeft: width * 0.09,
		width: width * 0.45,
	},
	text3: {
		color: "#000000",
		fontFamily: 'Poppins_500Medium',
		marginBottom: height * 0.05,
		marginHorizontal: width * 0.09,
	},
	text4: {
		color: "#000000",
		fontSize: width * 0.03,
		fontFamily: 'Poppins_500Medium',
	},
	text5: {
		color: "#000000",
		fontSize: width * 0.035,
		fontFamily: 'Poppins_500Medium',
		marginBottom: height * 0.005,
	},
	text6: {
		color: "#71727A",
		fontSize: width * 0.025,
		fontFamily: 'Poppins_500Medium',
	},
	text7: {
		color: "#FFFFFF",
		fontSize: width * 0.045,
		fontFamily: 'Poppins_500Medium',
	},
	view3: {
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingTop: height * 0.02,
		paddingBottom: height * 0.04,
	},
	view2: {
		alignItems: "center",
		backgroundColor: "#2C5FDD",
		borderRadius: 10,
		paddingVertical: height * 0.018,
		marginHorizontal: width * 0.08,
		shadowColor: "#00000033",
		shadowOpacity: 0.2,
		shadowOffset: {
		    width: 0,
		    height: 0
		},
		shadowRadius: 20,
		elevation: 20,
	},
	// Stage Image Styles
	stageImageSection: {
		marginHorizontal: width * 0.08,
		marginBottom: height * 0.03,
		padding: width * 0.04,
		backgroundColor: "#F8F9FA",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#E9ECEF",
	},
	stageImageTitle: {
		color: "#000000",
		fontSize: width * 0.035,
		fontFamily: 'Poppins_600SemiBold',
		marginBottom: height * 0.015,
	},
	stageImageButton: {
		backgroundColor: "#2C5FDD",
		paddingVertical: height * 0.015,
		paddingHorizontal: width * 0.04,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: height * 0.01,
	},
	stageImageButtonText: {
		color: "#FFFFFF",
		fontSize: width * 0.035,
		fontFamily: 'Poppins_500Medium',
	},
	imagePreview: {
		alignItems: "center",
		marginTop: height * 0.01,
	},
	previewImage: {
		width: width * 0.3,
		height: height * 0.15,
		borderRadius: 8,
		marginBottom: height * 0.01,
	},
	previewText: {
		color: "#28A745",
		fontSize: width * 0.03,
		fontFamily: 'Poppins_500Medium',
	},
});
