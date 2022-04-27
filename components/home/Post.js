import { StyleSheet, Text, View, Image, ToastAndroid, TouchableOpacity } from 'react-native'
import React from 'react'
import MeterialIcon from 'react-native-vector-icons/MaterialIcons'
import { PostFooterIcons } from '../../data/posts'

const Post = ({ post }) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <PostFooter PostFooterIcons={PostFooterIcons} />
                <Like post={post} />
                <Caption post={post} />
                <CommentSection post={post} />
                <Comments post={post} />
            </View>
        </View>
    )
}

const PostHeader = ({ post }) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
            alignItems: 'center'
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: post.profilePicture }} style={styles.postHeaderImage} />
                <Text style={{ color: '#FFF', marginLeft: 5, fontWeight: '700' }}>{post.user}</Text>
            </View>
            <MeterialIcon name='more-vert' color={'#FFF'} size={20}
                onPress={() => ToastAndroid.show("Under Development", ToastAndroid.SHORT)} />
        </View>
    )
}

const PostImage = ({ post }) => (
    <View style={{ width: '100%', height: 480 }}>
        <Image source={{ uri: post.imageUrl }} style={{ height: '100%', resizeMode: "cover" }} />
    </View>
)

const PostFooter = ({ PostFooterIcons }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.leftFooterIconsContainer}>
            <Icon imageStyle={styles.footerIcon} imageUrl={PostFooterIcons[0].imageUrl} />
            <Icon imageStyle={[styles.footerIcon, styles.commentIcon]} imageUrl={PostFooterIcons[1].imageUrl} />
            <Icon imageStyle={[styles.footerIcon, styles.shareIcon]} imageUrl={PostFooterIcons[2].imageUrl} />
        </View>
        <View>
            <Icon imageStyle={styles.footerIcon} imageUrl={PostFooterIcons[3].imageUrl} />
        </View>
    </View>
)

const Icon = ({ imageStyle, imageUrl }) => (
    <TouchableOpacity>
        <Image style={imageStyle} source={{ uri: imageUrl }} />
    </TouchableOpacity>
)

const Like = ({ post }) => {
    return (
        <View style={{ marginTop: 4 }}>
            <Text style={{ color: '#FFF', fontWeight: '600' }}>
                {post.likes.toLocaleString('en')} likes</Text>
        </View>
    )
}

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: '#FFF' }}>
            <Text style={{ fontWeight: '600' }}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const CommentSection = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {!!post.comments.length && (
            <Text style={{ color: "gray" }}>
                View
                {post.comments.length > 1 ? " all" : ""} {post.comments.length} {''}
                {post.comments.length > 1 ? "comments" : "comment"}
            </Text>
        )}
    </View>
)

const Comments = ({ post }) => (
    <>
        {post.comments.map((comment, index) => (
            <View key={index} style={{ marginTop: 5, flexDirection: 'row' }}>
                <Text style={{ color: '#FFF' }}>
                    <Text style={{ fontWeight: '600' }}>{comment.user}</Text> {''}
                    {comment.comment}
                </Text>
            </View>
        ))}
    </>
)

export default Post

const styles = StyleSheet.create({
    postHeaderImage: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 3,
        borderWidth: 1.6,
        borderColor: '#833AB4'
    },
    footerIcon: {
        width: 30,
        height: 30,
        justifyContent: 'space-between'
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '34%',
        justifyContent: 'space-between'
    },
    shareIcon: {
        transform: [{
            rotateZ: '-38deg'
        }],
        bottom: 2.3
    },
    commentIcon: {
        transform: [{
            rotateY: '180deg'
        }]
    }
})