import { getUser, getCode, getUserInfo, getChannels, getUserDes, updateUserDes, updateAvatar } from './user'
import { getTotalChannelList, getAllChannel, delChannel, addChannel } from './chanel'
import { getRecommend, getSearchResults } from './search'
import { getArticleDeciption, followUser, cancleFollowUser } from './articleDescription'
import { collectArticle, cancleCollectArticle, likeArticle, dislikeArticle, getCommentList, getCommentLikes, cancleCommentLikes, pubCom } from './comment'
export const getUserApi = getUser
export const getCodeApi = getCode
export const getUserInfoApi = getUserInfo
export const getChannelsApi = getChannels
export const getTotalChannelListApi = getTotalChannelList
export const getAllChannelApi = getAllChannel
export const delChannelApi = delChannel
export const addChannelApi = addChannel
export const getRecommendApi = getRecommend
export const getSearchResultsApi = getSearchResults
export const getArticleDeciptionApi = getArticleDeciption
export const followUserApi = followUser
export const cancleFollowUserApi = cancleFollowUser
export const collectArticleApi = collectArticle
export const cancleCollectArticleApi = cancleCollectArticle
export const likeArticleApi = likeArticle
export const dislikeArticleApi = dislikeArticle
export const getCommentListApi = getCommentList
export const getCommentLikesApi = getCommentLikes
export const cancleCommentLikesApi = cancleCommentLikes
export const pubComApi = pubCom
export const getUserDesApi = getUserDes
export const updateUserDesApi = updateUserDes
export const updateAvatarApi = updateAvatar
