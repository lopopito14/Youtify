/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
export class ErrorResponseException extends Error {
  constructor(errorResponse: ErrorResponse) {
    super(errorResponse.error.message);
  }
}

export interface ErrorResponse {
  error: MainError;
}

export interface MainError {
  errors: SingleError[];
  code: number;
  message: string;
}

export interface SingleError {
  domain: string;
  reason: string;
  message: string;
  locationType: string;
  location: string;
}

interface StandardParameters {
  /**
   * Auth client or API Key for the request
   */
  auth?: string;

  /**
   * V1 error format.
   */
  '$.xgafv'?: string;
  /**
   * OAuth access token.
   */
  access_token?: string;
  /**
   * Data format for response.
   */
  alt?: string;
  /**
   * JSONP
   */
  callback?: string;
  /**
   * Selector specifying which fields to include in a partial response.
   */
  fields?: string;
  /**
   * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
   */
  key?: string;
  /**
   * OAuth 2.0 token for the current user.
   */
  oauth_token?: string;
  /**
   * Returns response with indentations and line breaks.
   */
  prettyPrint?: boolean;
  /**
   * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
   */
  quotaUser?: string;
  /**
   * Legacy upload protocol for media (e.g. "media", "multipart").
   */
  uploadType?: string;
  /**
   * Upload protocol for media (e.g. "raw", "multipart").
   */
  upload_protocol?: string;
}

/**
 * Rights management policy for YouTube resources.
 */
export interface AccessPolicy {
  /**
   * The value of &lt;code&gt;allowed&lt;/code&gt; indicates whether the access to the policy is allowed or denied by default.
   */
  allowed?: boolean | null;
  /**
   * A list of region codes that identify countries where the default policy do not apply.
   */
  exception?: string[] | null;
}
/**
 * An &lt;code&gt;&lt;strong&gt;activity&lt;/strong&gt;&lt;/code&gt; resource contains information about an action that a particular channel, or user, has taken on YouTube.The actions reported in activity feeds include rating a video, sharing a video, marking a video as a favorite, commenting on a video, uploading a video, and so forth. Each &lt;code&gt;activity&lt;/code&gt; resource identifies the type of action, the channel associated with the action, and the resource(s) associated with the action, such as the video that was rated or uploaded.
 */
export interface Activity {
  /**
   * The &lt;code&gt;contentDetails&lt;/code&gt; object contains information about the content associated with the activity. For example, if the &lt;code&gt;snippet.type&lt;/code&gt; value is &lt;code&gt;videoRated&lt;/code&gt;, then the &lt;code&gt;contentDetails&lt;/code&gt; object&#39;s content identifies the rated video.
   */
  contentDetails?: ActivityContentDetails;
  /**
   * Etag of this resource
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the activity.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#activity&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the activity, including the activity&#39;s type and group ID.
   */
  snippet?: ActivitySnippet;
}
/**
 * Details about the content of an activity: the video that was shared, the channel that was subscribed to, etc.
 */
export interface ActivityContentDetails {
  /**
   * The &lt;code&gt;bulletin&lt;/code&gt; object contains details about a channel bulletin post. This object is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;bulletin&lt;/code&gt;.
   */
  bulletin?: ActivityContentDetailsBulletin;
  /**
   * The &lt;code&gt;channelItem&lt;/code&gt; object contains details about a resource which was added to a channel. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;channelItem&lt;/code&gt;.
   */
  channelItem?: ActivityContentDetailsChannelItem;
  /**
   * The &lt;code&gt;comment&lt;/code&gt; object contains information about a resource that received a comment. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;comment&lt;/code&gt;.
   */
  comment?: ActivityContentDetailsComment;
  /**
   * The &lt;code&gt;favorite&lt;/code&gt; object contains information about a video that was marked as a favorite video. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;favorite&lt;/code&gt;.
   */
  favorite?: ActivityContentDetailsFavorite;
  /**
   * The &lt;code&gt;like&lt;/code&gt; object contains information about a resource that received a positive (like) rating. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;like&lt;/code&gt;.
   */
  like?: ActivityContentDetailsLike;
  /**
   * The &lt;code&gt;playlistItem&lt;/code&gt; object contains information about a new playlist item. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;playlistItem&lt;/code&gt;.
   */
  playlistItem?: ActivityContentDetailsPlaylistItem;
  /**
   * The &lt;code&gt;promotedItem&lt;/code&gt; object contains details about a resource which is being promoted. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;promotedItem&lt;/code&gt;.
   */
  promotedItem?: ActivityContentDetailsPromotedItem;
  /**
   * The &lt;code&gt;recommendation&lt;/code&gt; object contains information about a recommended resource. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;recommendation&lt;/code&gt;.
   */
  recommendation?: ActivityContentDetailsRecommendation;
  /**
   * The &lt;code&gt;social&lt;/code&gt; object contains details about a social network post. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;social&lt;/code&gt;.
   */
  social?: ActivityContentDetailsSocial;
  /**
   * The &lt;code&gt;subscription&lt;/code&gt; object contains information about a channel that a user subscribed to. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;subscription&lt;/code&gt;.
   */
  subscription?: ActivityContentDetailsSubscription;
  /**
   * The &lt;code&gt;upload&lt;/code&gt; object contains information about the uploaded video. This property is only present if the &lt;code&gt;snippet.type&lt;/code&gt; is &lt;code&gt;upload&lt;/code&gt;.
   */
  upload?: ActivityContentDetailsUpload;
}
/**
 * Details about a channel bulletin post.
 */
export interface ActivityContentDetailsBulletin {
  /**
   * The &lt;code&gt;resourceId&lt;/code&gt; object contains information that identifies the resource associated with a bulletin post. @mutable youtube.activities.insert
   */
  resourceId?: ResourceId;
}
/**
 * Details about a resource which was added to a channel.
 */
export interface ActivityContentDetailsChannelItem {
  /**
   * The &lt;code&gt;resourceId&lt;/code&gt; object contains information that identifies the resource that was added to the channel.
   */
  resourceId?: ResourceId;
}
/**
 * Information about a resource that received a comment.
 */
export interface ActivityContentDetailsComment {
  /**
   * The &lt;code&gt;resourceId&lt;/code&gt; object contains information that identifies the resource associated with the comment.
   */
  resourceId?: ResourceId;
}
/**
 * Information about a video that was marked as a favorite video.
 */
export interface ActivityContentDetailsFavorite {
  /**
   * The &lt;code&gt;resourceId&lt;/code&gt; object contains information that identifies the resource that was marked as a favorite.
   */
  resourceId?: ResourceId;
}
/**
 * Information about a resource that received a positive (like) rating.
 */
export interface ActivityContentDetailsLike {
  /**
   * The &lt;code&gt;resourceId&lt;/code&gt; object contains information that identifies the rated resource.
   */
  resourceId?: ResourceId;
}
/**
 * Information about a new playlist item.
 */
export interface ActivityContentDetailsPlaylistItem {
  /**
   * The value that YouTube uses to uniquely identify the playlist.
   */
  playlistId?: string | null;
  /**
   * ID of the item within the playlist.
   */
  playlistItemId?: string | null;
  /**
   * The &lt;code&gt;resourceId&lt;/code&gt; object contains information about the resource that was added to the playlist.
   */
  resourceId?: ResourceId;
}
/**
 * Details about a resource which is being promoted.
 */
export interface ActivityContentDetailsPromotedItem {
  /**
   * The URL the client should fetch to request a promoted item.
   */
  adTag?: string | null;
  /**
   * The URL the client should ping to indicate that the user clicked through on this promoted item.
   */
  clickTrackingUrl?: string | null;
  /**
   * The URL the client should ping to indicate that the user was shown this promoted item.
   */
  creativeViewUrl?: string | null;
  /**
   * The type of call-to-action, a message to the user indicating action that can be taken.
   */
  ctaType?: string | null;
  /**
   * The custom call-to-action button text. If specified, it will override the default button text for the cta_type.
   */
  customCtaButtonText?: string | null;
  /**
   * The text description to accompany the promoted item.
   */
  descriptionText?: string | null;
  /**
   * The URL the client should direct the user to, if the user chooses to visit the advertiser&#39;s website.
   */
  destinationUrl?: string | null;
  /**
   * The list of forecasting URLs. The client should ping all of these URLs when a promoted item is not available, to indicate that a promoted item could have been shown.
   */
  forecastingUrl?: string[] | null;
  /**
   * The list of impression URLs. The client should ping all of these URLs to indicate that the user was shown this promoted item.
   */
  impressionUrl?: string[] | null;
  /**
   * The ID that YouTube uses to uniquely identify the promoted video.
   */
  videoId?: string | null;
}
/**
 * Information that identifies the recommended resource.
 */
export interface ActivityContentDetailsRecommendation {
  /**
   * The reason that the resource is recommended to the user.
   */
  reason?: string | null;
  /**
   * The &lt;code&gt;resourceId&lt;/code&gt; object contains information that identifies the recommended resource.
   */
  resourceId?: ResourceId;
  /**
   * The &lt;code&gt;seedResourceId&lt;/code&gt; object contains information about the resource that caused the recommendation.
   */
  seedResourceId?: ResourceId;
}
/**
 * Details about a social network post.
 */
export interface ActivityContentDetailsSocial {
  /**
   * The author of the social network post.
   */
  author?: string | null;
  /**
   * An image of the post&#39;s author.
   */
  imageUrl?: string | null;
  /**
   * The URL of the social network post.
   */
  referenceUrl?: string | null;
  /**
   * The &lt;code&gt;resourceId&lt;/code&gt; object encapsulates information that identifies the resource associated with a social network post.
   */
  resourceId?: ResourceId;
  /**
   * The name of the social network.
   */
  type?: string | null;
}
/**
 * Information about a channel that a user subscribed to.
 */
export interface ActivityContentDetailsSubscription {
  /**
   * The &lt;code&gt;resourceId&lt;/code&gt; object contains information that identifies the resource that the user subscribed to.
   */
  resourceId?: ResourceId;
}
/**
 * Information about the uploaded video.
 */
export interface ActivityContentDetailsUpload {
  /**
   * The ID that YouTube uses to uniquely identify the uploaded video.
   */
  videoId?: string | null;
}
export interface ActivityListParameter extends StandardParameters {
  /**
   *
   */
  channelId?: string;
  /**
   *
   */
  home?: boolean;
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   *
   */
  mine?: boolean;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>activity</code> resource properties that the API response will include.<br><br>If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in an <code>activity</code> resource, the <code>snippet</code> property contains other properties that identify the type of activity, a display title for the activity, and so forth. If you set <code><strong>part=snippet</strong></code>, the API response will also contain all of those nested properties.
   */
  part?: string[];
  /**
   *
   */
  publishedAfter?: string;
  /**
   *
   */
  publishedBefore?: string;
  /**
   *
   */
  regionCode?: string;
}
export interface ActivityListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  items?: Activity[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#activityListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about an activity, including title, description, thumbnails, activity type and group. Next ID: 12
 */
export interface ActivitySnippet {
  /**
   * The ID that YouTube uses to uniquely identify the channel associated with the activity.
   */
  channelId?: string | null;
  /**
   * Channel title for the channel responsible for this activity
   */
  channelTitle?: string | null;
  /**
   * The description of the resource primarily associated with the activity. @mutable youtube.activities.insert
   */
  description?: string | null;
  /**
   * The group ID associated with the activity. A group ID identifies user events that are associated with the same user and resource. For example, if a user rates a video and marks the same video as a favorite, the entries for those events would have the same group ID in the user&#39;s activity feed. In your user interface, you can avoid repetition by grouping events with the same &lt;code&gt;groupId&lt;/code&gt; value.
   */
  groupId?: string | null;
  /**
   * The date and time that the video was uploaded. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * A map of thumbnail images associated with the resource that is primarily associated with the activity. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The title of the resource primarily associated with the activity.
   */
  title?: string | null;
  /**
   * The type of activity that the resource describes.
   */
  type?: string | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;caption&lt;/strong&gt;&lt;/code&gt; resource represents a YouTube caption track. A caption track is associated with exactly one YouTube video.
 */
export interface Caption {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the caption track.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#caption&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the caption.
   */
  snippet?: CaptionSnippet;
}
export interface CaptionDeleteParamater extends StandardParameters {
  /**
   *
   */
  id?: string;
  /**
   * ID of the Google+ Page for the channel that the request is be on behalf of
   */
  onBehalfOf?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}
export interface CaptionDownloadParamater extends StandardParameters {
  /**
   * The ID of the caption track to download, required for One Platform.
   */
  id?: string;
  /**
   * ID of the Google+ Page for the channel that the request is be on behalf of
   */
  onBehalfOf?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * Convert the captions into this format. Supported options are sbv, srt, and vtt.
   */
  tfmt?: string;
  /**
   * tlang is the language code; machine translate the captions into this language.
   */
  tlang?: string;
}
export interface CaptionInsertParamater extends StandardParameters {
  /**
   * ID of the Google+ Page for the channel that the request is be on behalf of
   */
  onBehalfOf?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>caption</code> resource parts that the API response will include. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];
  /**
   * Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio.
   */
  sync?: boolean;

  /**
   * Request body metadata
   */
  requestBody?: Caption;

  /**
   * Media metadata
   */
  media?: {
    /**
     * Media mime-type
     */
    mimeType?: string;

    /**
     * Media body contents
     */
    body?: any;
  };
}
export interface CaptionListParamater extends StandardParameters {
  /**
   * Returns the captions with the given IDs for Stubby or Apiary.
   */
  id?: string[];
  /**
   * ID of the Google+ Page for the channel that the request is on behalf of.
   */
  onBehalfOf?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>caption</code> resource parts that the API response will include. The <code>part</code> names that you can include in the parameter value are <code>id</code> and <code>snippet</code>.
   */
  part?: string[];
  /**
   * Returns the captions for the specified video.
   */
  videoId?: string;
}
export interface CaptionUpdateParamater extends StandardParameters {
  /**
   * ID of the Google+ Page for the channel that the request is on behalf of.
   */
  onBehalfOf?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>caption</code> resource parts that the API response will include. The <code>part</code> names that you can include in the parameter value are <code>id</code> and <code>snippet</code>.
   */
  part?: string[];
  /**
   * Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio.
   */
  sync?: boolean;

  /**
   * Request body metadata
   */
  requestBody?: Caption;

  /**
   * Media metadata
   */
  media?: {
    /**
     * Media mime-type
     */
    mimeType?: string;

    /**
     * Media body contents
     */
    body?: any;
  };
}
export interface CaptionListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of captions that match the request criteria.
   */
  items?: Caption[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#captionListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about a caption track, such as its language and name.
 */
export interface CaptionSnippet {
  /**
   * The type of audio track associated with the caption track.
   */
  audioTrackType?: string | null;
  /**
   * The reason that YouTube failed to process the caption track. This property is only present if the &lt;code&gt;&lt;a href=&quot;#state&quot;&gt;state&lt;/a&gt;&lt;/code&gt; property&#39;s value is &lt;code&gt;failed&lt;/code&gt;.
   */
  failureReason?: string | null;
  /**
   * Indicates whether YouTube synchronized the caption track to the audio track in the video. The value will be &lt;code&gt;true&lt;/code&gt; if a sync was explicitly requested when the caption track was uploaded. For example, when calling the &lt;code&gt;captions.insert&lt;/code&gt; or &lt;code&gt;captions.update&lt;/code&gt; methods, you can set the &lt;code&gt;sync&lt;/code&gt; parameter to &lt;code&gt;true&lt;/code&gt; to instruct YouTube to sync the uploaded track to the video. If the value is &lt;code&gt;false&lt;/code&gt;, YouTube uses the time codes in the uploaded caption track to determine when to display captions.
   */
  isAutoSynced?: boolean | null;
  /**
   * Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is &lt;code&gt;false&lt;/code&gt;.
   */
  isCC?: boolean | null;
  /**
   * Indicates whether the caption track is a draft. If the value is &lt;code&gt;true&lt;/code&gt;, then the track is not publicly visible. The default value is &lt;code&gt;false&lt;/code&gt;. @mutable youtube.captions.insert youtube.captions.update
   */
  isDraft?: boolean | null;
  /**
   * Indicates whether caption track is formatted for &quot;easy reader,&quot; meaning it is at a third-grade level for language learners. The default value is &lt;code&gt;false&lt;/code&gt;.
   */
  isEasyReader?: boolean | null;
  /**
   * Indicates whether the caption track uses large text for the vision-impaired. The default value is &lt;code&gt;false&lt;/code&gt;.
   */
  isLarge?: boolean | null;
  /**
   * The language of the caption track. The property value is a &lt;a href=&quot;http://www.rfc-editor.org/rfc/bcp/bcp47.txt&quot;&gt;BCP-47&lt;/a&gt;  language tag.
   */
  language?: string | null;
  /**
   * The date and time when the caption track was last updated. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  lastUpdated?: string | null;
  /**
   * The name of the caption track. The name is intended to be visible to the user as an option during playback.
   */
  name?: string | null;
  /**
   * The caption track&#39;s status.
   */
  status?: string | null;
  /**
   * The caption track&#39;s type.
   */
  trackKind?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the video associated with the caption track. @mutable youtube.captions.insert
   */
  videoId?: string | null;
}
/**
 * Brief description of the live stream cdn settings.
 */
export interface CdnSettings {
  /**
   * The format of the video stream that you are sending to Youtube. &lt;br&gt;&lt;br&gt;
   */
  format?: string | null;
  /**
   * The frame rate of the inbound video data.
   */
  frameRate?: string | null;
  /**
   * The &lt;code&gt;ingestionInfo&lt;/code&gt; object contains information that YouTube provides that you need to transmit your RTMP or HTTP stream to YouTube.
   */
  ingestionInfo?: IngestionInfo;
  /**
   *  The method or protocol used to transmit the video stream.
   */
  ingestionType?: string | null;
  /**
   * The resolution of the inbound video data.
   */
  resolution?: string | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;channel&lt;/strong&gt;&lt;/code&gt; resource contains information about a YouTube channel.
 */
export interface Channel {
  /**
   * The &lt;code&gt;auditionDetails&lt;/code&gt; object encapsulates channel data that is relevant for YouTube Partners during the audition process.
   */
  auditDetails?: ChannelAuditDetails;
  /**
   * The &lt;code&gt;brandingSettings&lt;/code&gt; object encapsulates information about the branding of the channel.
   */
  brandingSettings?: ChannelBrandingSettings;
  /**
   * The &lt;code&gt;contentDetails&lt;/code&gt; object encapsulates information about the channel&#39;s content.
   */
  contentDetails?: ChannelContentDetails;
  /**
   * The &lt;code&gt;contentOwnerDetails&lt;/code&gt; object encapsulates channel data that is relevant for YouTube Partners linked with the channel.
   */
  contentOwnerDetails?: ChannelContentOwnerDetails;
  /**
   * The &lt;code&gt;conversionPings&lt;/code&gt; object encapsulates information about conversion pings that need to be respected by the channel.
   */
  conversionPings?: ChannelConversionPings;
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the channel.
   */
  id?: string | null;
  /**
   * The &lt;code&gt;invideoPromotion&lt;/code&gt; object encapsulates information about promotion campaign associated with the channel.
   */
  invideoPromotion?: InvideoPromotion;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#channel&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * Localizations for different languages
   */
  localizations?: {[key: string]: ChannelLocalization} | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the channel, such as its title, description, and thumbnail images.
   */
  snippet?: ChannelSnippet;
  /**
   * The &lt;code&gt;statistics&lt;/code&gt; object encapsulates statistics for the channel.
   */
  statistics?: ChannelStatistics;
  /**
   * The &lt;code&gt;status&lt;/code&gt; object encapsulates information about the privacy status of the channel.
   */
  status?: ChannelStatus;
  /**
   * The &lt;code&gt;topicDetails&lt;/code&gt; object encapsulates information about &lt;a href=&quot;http://www.freebase.com&quot;&gt;Freebase&lt;/a&gt; topics associated with the channel.
   */
  topicDetails?: ChannelTopicDetails;
}
/**
 * The &lt;code&gt;auditDetails&lt;/code&gt; object encapsulates channel data that is relevant for YouTube Partners during the audit process.
 */
export interface ChannelAuditDetails {
  /**
   * Whether or not the channel respects the community guidelines.
   */
  communityGuidelinesGoodStanding?: boolean | null;
  /**
   * Whether or not the channel has any unresolved claims.
   */
  contentIdClaimsGoodStanding?: boolean | null;
  /**
   * Whether or not the channel has any copyright strikes.
   */
  copyrightStrikesGoodStanding?: boolean | null;
}
/**
 * A channel banner resource.
 */
export interface ChannelBannerResource {
  etag?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#channelBannerResource&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The URL of this banner image.
   */
  url?: string | null;
}
export interface ChannelBannerInsertParameter extends StandardParameters {
  /**
   * Unused, channel_id is currently derived from the security context of the requestor.
   */
  channelId?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;

  /**
   * Request body metadata
   */
  requestBody?: ChannelBannerResource;

  /**
   * Media metadata
   */
  media?: {
    /**
     * Media mime-type
     */
    mimeType?: string;

    /**
     * Media body contents
     */
    body?: any;
  };
}
/**
 * A channel banner returned as the response to a channel_banner.insert call.
 */
export interface ChannelBannerInsertResponse extends ChannelBannerResource {}
/**
 * Branding properties of a YouTube channel.
 */
export interface ChannelBrandingSettings {
  /**
   * Branding properties for the channel view.
   */
  channel?: ChannelSettings;
  /**
   * Additional experimental branding properties.
   */
  hints?: PropertyValue[];
  /**
   * Branding properties for branding images.
   */
  image?: ImageSettings;
  /**
   * Branding properties for the watch page.
   */
  watch?: WatchSettings;
}
/**
 * Details about the content of a channel.
 */
export interface ChannelContentDetails {
  relatedPlaylists?: {
    favorites?: string;
    likes?: string;
    uploads?: string;
    watchHistory?: string;
    watchLater?: string;
  } | null;
}
/**
 * The &lt;code&gt;contentOwnerDetails&lt;/code&gt; object encapsulates channel data that is relevant for YouTube Partners linked with the channel.
 */
export interface ChannelContentOwnerDetails {
  /**
   * The ID of the content owner linked to the channel.
   */
  contentOwner?: string | null;
  /**
   * The date and time of when the channel was linked to the content owner. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  timeLinked?: string | null;
}
/**
 * Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping.
 */
export interface ChannelConversionPing {
  /**
   * Defines the context of the ping.
   */
  context?: string | null;
  /**
   * The url (without the schema) that the player shall send the ping to. It&#39;s at caller&#39;s descretion to decide which schema to use (http vs https) Example of a returned url: //googleads.g.doubleclick.net/pagead/ viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&amp;labe=default The caller must append biscotti authentication (ms param in case of mobile, for example) to this ping.
   */
  conversionUrl?: string | null;
}
/**
 * The &lt;code&gt;conversionPings&lt;/code&gt; object encapsulates information about conversion pings that need to be respected by the channel.
 */
export interface ChannelConversionPings {
  /**
   * Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping.
   */
  pings?: ChannelConversionPing[];
}
export interface ChannelListParameter extends StandardParameters {
  /**
   * Return the channels within the specified guide category ID.
   */
  categoryId?: string;
  /**
   * Return the channel associated with a YouTube username.
   */
  forUsername?: string;
  /**
   * Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX).
   */
  hl?: string;
  /**
   * Return the channels with the specified IDs.
   */
  id?: string[];
  /**
   * Return the channels managed by the authenticated user.
   */
  managedByMe?: boolean;
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Return the ids of channels owned by the authenticated user.
   */
  mine?: boolean;
  /**
   * Return the channels subscribed to the authenticated user
   */
  mySubscribers?: boolean;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>channel</code> resource properties that the API response will include.<br><br>If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a <code>channel</code> resource, the <code>contentDetails</code> property contains other properties, such as the <code>uploads</code> properties. As such, if you set <code><strong>part=contentDetails</strong></code>, the API response will also contain all of those nested properties.
   */
  part?: string[];
}
export interface ChannelUpdateParameter extends StandardParameters {
  /**
   * The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br/><br/>The API currently only allows the parameter value to be set to either <code>brandingSettings</code> or <code>invideoPromotion</code>. (You cannot update both of those parts with a single request.)<br/><br/>Note that this method overrides the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: Channel;
}
export interface ChannelListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  items?: Channel[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#channelListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
export interface ChannelUpdateResponse extends Channel {}
/**
 * Channel localization setting
 */
export interface ChannelLocalization {
  /**
   * The localized strings for channel&#39;s description.
   */
  description?: string | null;
  /**
   * The localized strings for channel&#39;s title.
   */
  title?: string | null;
}
export interface ChannelProfileDetails {
  /**
   * The YouTube channel ID.
   */
  channelId?: string | null;
  /**
   * The channel&#39;s URL.
   */
  channelUrl?: string | null;
  /**
   * The channel&#39;s display name.
   */
  displayName?: string | null;
  /**
   * The channels&#39;s avatar URL.
   */
  profileImageUrl?: string | null;
}
export interface ChannelSection {
  /**
   * The &lt;code&gt;contentDetails&lt;/code&gt; object contains details about the channel section content, such as a list of playlists or channels featured in the section.
   */
  contentDetails?: ChannelSectionContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the channel section.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#channelSection&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * Localizations for different languages
   */
  localizations?: {[key: string]: ChannelSectionLocalization} | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the channel section, such as its type, style and title.
   */
  snippet?: ChannelSectionSnippet;
  /**
   * The &lt;code&gt;targeting&lt;/code&gt; object contains basic targeting settings about the channel section.
   */
  targeting?: ChannelSectionTargeting;
}
/**
 * Details about a channelsection, including playlists and channels.
 */
export interface ChannelSectionContentDetails {
  /**
   * The channel ids for type multiple_channels.
   */
  channels?: string[] | null;
  /**
   * The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed.
   */
  playlists?: string[] | null;
}
export interface ChannelSectionDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}
export interface ChannelSectionInsertParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br/><br/>The <code>part</code> names that you can include in the parameter value are <code>snippet</code> and <code>contentDetails</code>.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: ChannelSection;
}
export interface ChannelSectionListParameter extends StandardParameters {
  /**
   * Return the ChannelSections owned by the specified channel ID.
   */
  channelId?: string;
  /**
   * Return content in specified language
   */
  hl?: string;
  /**
   * Return the ChannelSections with the given IDs for Stubby or Apiary.
   */
  id?: string[];
  /**
   * Return the ChannelSections owned by the authenticated user.
   */
  mine?: boolean;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>channelSection</code> resource properties that the API response will include. The <code>part</code> names that you can include in the parameter value are <code>id</code>, <code>snippet</code>, and <code>contentDetails</code>.<br><br>If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a <code>channelSection</code> resource, the <code>snippet</code> property contains other properties, such as a display title for the channelSection. If you set <code><strong>part=snippet</strong></code>, the API response will also contain all of those nested properties.
   */
  part?: string[];
}
export interface ChannelSectionUpdateParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br/><br/>The <code>part</code> names that you can include in the parameter value are <code>snippet</code> and <code>contentDetails</code>.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: ChannelSection;
}
export interface ChannelSectionInsertResponse extends Channel {}
export interface ChannelSectionListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of ChannelSections that match the request criteria.
   */
  items?: ChannelSection[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#channelSectionListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
export interface ChannelSectionUpdateResponse extends ChannelSection {}
/**
 * ChannelSection localization setting
 */
export interface ChannelSectionLocalization {
  /**
   * The localized strings for channel section&#39;s title.
   */
  title?: string | null;
}
/**
 * Basic details about a channel section, including title, style and position.
 */
export interface ChannelSectionSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the channel that published the channel section.
   */
  channelId?: string | null;
  /**
   * The language of the channel section&#39;s default title and description.
   */
  defaultLanguage?: string | null;
  /**
   * Localized title, read-only.
   */
  localized?: ChannelSectionLocalization;
  /**
   * The position of the channel section in the channel.
   */
  position?: number | null;
  /**
   * The style of the channel section.
   */
  style?: string | null;
  /**
   * The channel section&#39;s title for multiple_playlists and multiple_channels.
   */
  title?: string | null;
  /**
   * The type of the channel section.
   */
  type?: string | null;
}
/**
 * ChannelSection targeting setting.
 */
export interface ChannelSectionTargeting {
  /**
   * The country the channel section is targeting.
   */
  countries?: string[] | null;
  /**
   * The language the channel section is targeting.
   */
  languages?: string[] | null;
  /**
   * The region the channel section is targeting.
   */
  regions?: string[] | null;
}
/**
 * Branding properties for the channel view.
 */
export interface ChannelSettings {
  /**
   * The country of the channel.
   */
  country?: string | null;
  defaultLanguage?: string | null;
  /**
   * Which content tab users should see when viewing the channel.
   */
  defaultTab?: string | null;
  /**
   * Specifies the channel description.
   */
  description?: string | null;
  /**
   * Title for the featured channels tab.
   */
  featuredChannelsTitle?: string | null;
  /**
   * The list of featured channels.
   */
  featuredChannelsUrls?: string[] | null;
  /**
   * Lists keywords associated with the channel, comma-separated.
   */
  keywords?: string | null;
  /**
   * Whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible.
   */
  moderateComments?: boolean | null;
  /**
   * A prominent color that can be rendered on this channel page.
   */
  profileColor?: string | null;
  /**
   * Whether the tab to browse the videos should be displayed.
   */
  showBrowseView?: boolean | null;
  /**
   * Whether related channels should be proposed.
   */
  showRelatedChannels?: boolean | null;
  /**
   * Specifies the channel title.
   */
  title?: string | null;
  /**
   * The ID for a Google Analytics account to track and measure traffic to the channels.
   */
  trackingAnalyticsAccountId?: string | null;
  /**
   * The trailer of the channel, for users that are not subscribers.
   */
  unsubscribedTrailer?: string | null;
}
/**
 * Basic details about a channel, including title, description and thumbnails.
 */
export interface ChannelSnippet {
  /**
   * The country of the channel.
   */
  country?: string | null;
  /**
   * The custom url of the channel.
   */
  customUrl?: string | null;
  /**
   * The language of the channel&#39;s default title and description.
   */
  defaultLanguage?: string | null;
  /**
   * The description of the channel.
   */
  description?: string | null;
  /**
   * Localized title and description, read-only.
   */
  localized?: ChannelLocalization;
  /**
   * The date and time that the channel was created. The value is specified in &lt; a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * A map of thumbnail images associated with the channel. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.&lt;br&gt;&lt;br&gt; When displaying thumbnails in your application, make sure that your code uses the image URLs exactly as they are returned in API responses. For example, your application should not use the &lt;code&gt;http&lt;/code&gt; domain instead of the &lt;code&gt;https&lt;/code&gt; domain in a URL returned in an API response.&lt;br&gt;&lt;br&gt; Beginning in July 2018, channel thumbnail URLs will only be available in the &lt;code&gt;https&lt;/code&gt; domain, which is how the URLs appear in API responses. After that time, you might see broken images in your application if it tries to load YouTube images from the &lt;code&gt;http&lt;/code&gt; domain.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The channel&#39;s title.
   */
  title?: string | null;
}
/**
 * Statistics about a channel: number of subscribers, number of videos in the channel, etc.
 */
export interface ChannelStatistics {
  /**
   * The number of comments for the channel.
   */
  commentCount?: string | null;
  /**
   * Whether or not the number of subscribers is shown for this user.
   */
  hiddenSubscriberCount?: boolean | null;
  /**
   * The number of subscribers that the channel has.
   */
  subscriberCount?: string | null;
  /**
   * The number of videos uploaded to the channel.
   */
  videoCount?: string | null;
  /**
   * The number of times the channel has been viewed.
   */
  viewCount?: string | null;
}
/**
 * JSON template for the status part of a channel.
 */
export interface ChannelStatus {
  /**
   * If true, then the user is linked to either a YouTube username or G+ account. Otherwise, the user doesn&#39;t have a public YouTube identity.
   */
  isLinked?: boolean | null;
  /**
   * The long uploads status of this channel. See https://support.google.com/youtube/answer/71673 for more information.
   */
  longUploadsStatus?: string | null;
  madeForKids?: boolean | null;
  /**
   * Privacy status of the channel.
   */
  privacyStatus?: string | null;
  selfDeclaredMadeForKids?: boolean | null;
}
/**
 * Freebase topic information related to the channel.
 */
export interface ChannelTopicDetails {
  /**
   * A list of Wikipedia URLs that describe the channel&#39;s content.
   */
  topicCategories?: string[] | null;
  /**
   * A list of Freebase topic IDs associated with the channel. You can retrieve information about each topic using the &lt;a href=&quot;http://wiki.freebase.com/wiki/Topic_API&quot;&gt;Freebase Topic API&lt;/a&gt;.
   */
  topicIds?: string[] | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;comment&lt;/strong&gt;&lt;/code&gt; represents a single YouTube comment.
 */
export interface Comment {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the comment.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#comment&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the comment.
   */
  snippet?: CommentSnippet;
}
export interface CommentDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
}
export interface CommentInsertParameter extends StandardParameters {
  /**
   * The <code><strong>part</strong></code> parameter identifies the properties that the API response will include. Set the parameter value to <code>snippet</code>. The <code>snippet</code> part has a quota cost of 2 units.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: Comment;
}
export interface CommentListParameter extends StandardParameters {
  /**
   * Returns the comments with the given IDs for One Platform.
   */
  id?: string[];
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * Returns replies to the specified comment. Note, currently YouTube features only one level of replies (ie replies to top level comments). However replies to replies may be supported in the future.
   */
  parentId?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>comment</code> resource properties that the API response will include.
   */
  part?: string[];
  /**
   * The requested text format for the returned comments.
   */
  textFormat?: string;
}
export interface CommentMarkasspamParameter extends StandardParameters {
  /**
   * Flags the comments with the given IDs as spam in the caller's opinion.
   */
  id?: string[];
}
export interface CommentSetmoderationstatusParameter
  extends StandardParameters {
  /**
   * If set to true the author of the comment gets added to the ban list. This means all future comments of the author will autmomatically be rejected. Only valid in combination with STATUS_REJECTED.
   */
  banAuthor?: boolean;
  /**
   * Modifies the moderation status of the comments with the given IDs
   */
  id?: string[];
  /**
   * Specifies the requested moderation status. Note, comments can be in statuses, which are not available through this call. For example, this call does not allow to mark a comment as 'likely spam'. Valid values: MODERATION_STATUS_PUBLISHED, MODERATION_STATUS_HELD_FOR_REVIEW, MODERATION_STATUS_REJECTED.
   */
  moderationStatus?: string;
}
export interface CommentUpdateParameter extends StandardParameters {
  /**
   * The <code><strong>part</strong></code> parameter identifies the properties that the API response will include. You must at least include the <code>snippet</code> part in the parameter value since that part contains all of the properties that the API request can update.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: Comment;
}
export interface CommentInsertResponse extends Comment {}
export interface CommentUpdateResponse extends Comment {}
export interface CommentListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of comments that match the request criteria.
   */
  items?: Comment[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#commentListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about a comment, such as its author and text.
 */
export interface CommentSnippet {
  authorChannelId?: CommentSnippetAuthorChannelId;
  /**
   * Link to the author&#39;s YouTube channel, if any.
   */
  authorChannelUrl?: string | null;
  /**
   * The name of the user who posted the comment.
   */
  authorDisplayName?: string | null;
  /**
   * The URL for the avatar of the user who posted the comment.
   */
  authorProfileImageUrl?: string | null;
  /**
   * Whether the current viewer can rate this comment.
   */
  canRate?: boolean | null;
  /**
   * The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video comment it&#39;s the video&#39;s channel.
   */
  channelId?: string | null;
  /**
   * The total number of likes this comment has received.
   */
  likeCount?: number | null;
  /**
   * The comment&#39;s moderation status. Will not be set if the comments were requested through the id filter.
   */
  moderationStatus?: string | null;
  /**
   * The unique id of the parent comment, only set for replies.
   */
  parentId?: string | null;
  /**
   * The date and time when the comment was orignally published. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * The comment&#39;s text. The format is either plain text or HTML dependent on what has been requested. Even the plain text representation may differ from the text originally posted in that it may replace video links with video titles etc.
   */
  textDisplay?: string | null;
  /**
   * The comment&#39;s original raw text as initially posted or last updated. The original text will only be returned if it is accessible to the viewer, which is only guaranteed if the viewer is the comment&#39;s author.
   */
  textOriginal?: string | null;
  /**
   * The date and time when was last updated . The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  updatedAt?: string | null;
  /**
   * The ID of the video the comment refers to, if any.
   */
  videoId?: string | null;
  /**
   * The rating the viewer has given to this comment. For the time being this will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may change in the future.
   */
  viewerRating?: string | null;
}
/**
 * The id of the author&#39;s YouTube channel, if any.
 */
export interface CommentSnippetAuthorChannelId {
  value?: string | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;comment thread&lt;/strong&gt;&lt;/code&gt; represents information that applies to a top level comment and all its replies. It can also include the top level comment itself and some of the replies.
 */
export interface CommentThread {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the comment thread.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#commentThread&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;replies&lt;/code&gt; object contains a limited number of replies (if any) to the top level comment found in the snippet.
   */
  replies?: CommentThreadReplies;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the comment thread and also the top level comment.
   */
  snippet?: CommentThreadSnippet;
}
export interface CommentThreadInsertParameter extends StandardParameters {
  /**
   * The <code><strong>part</strong></code> parameter identifies the properties that the API response will include. Set the parameter value to <code>snippet</code>. The <code>snippet</code> part has a quota cost of 2 units.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: CommentThread;
}
export interface CommentThreadListParameter extends StandardParameters {
  /**
   * Returns the comment threads of all videos of the channel and the channel comments as well.
   */
  allThreadsRelatedToChannelId?: string;
  /**
   * Returns the comment threads for all the channel comments (ie does not include comments left on videos).
   */
  channelId?: string;
  /**
   * Returns the comment threads with the given IDs for Stubby or Apiary.
   */
  id?: string[];
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Limits the returned comment threads to those with the specified moderation status. Not compatible with the 'id' filter. Valid values: published, heldForReview, likelySpam.
   */
  moderationStatus?: string;
  /**
   *
   */
  order?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>commentThread</code> resource properties that the API response will include.
   */
  part?: string[];
  /**
   * Limits the returned comment threads to those matching the specified key words. Not compatible with the 'id' filter.
   */
  searchTerms?: string;
  /**
   * The requested text format for the returned comments.
   */
  textFormat?: string;
  /**
   * Returns the comment threads of the specified video.
   */
  videoId?: string;
}
export interface CommentThreadUpdateParameter extends StandardParameters {
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of <code>commentThread</code> resource properties that the API response will include. You must at least include the <code>snippet</code> part in the parameter value since that part contains all of the properties that the API request can update.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: CommentThread;
}
export interface CommentThreadInsertResponse extends CommentThread {}
export interface CommentThreadUpdateResponse extends CommentThread {}
export interface CommentThreadListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of comment threads that match the request criteria.
   */
  items?: CommentThread[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#commentThreadListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Comments written in (direct or indirect) reply to the top level comment.
 */
export interface CommentThreadReplies {
  /**
   * A limited number of replies. Unless the number of replies returned equals total_reply_count in the snippet the returned replies are only a subset of the total number of replies.
   */
  comments?: Comment[];
}
/**
 * Basic details about a comment thread.
 */
export interface CommentThreadSnippet {
  /**
   * Whether the current viewer of the thread can reply to it. This is viewer specific - other viewers may see a different value for this field.
   */
  canReply?: boolean | null;
  /**
   * The YouTube channel the comments in the thread refer to or the channel with the video the comments refer to. If video_id isn&#39;t set the comments refer to the channel itself.
   */
  channelId?: string | null;
  /**
   * Whether the thread (and therefore all its comments) is visible to all YouTube users.
   */
  isPublic?: boolean | null;
  /**
   * The top level comment of this thread.
   */
  topLevelComment?: Comment;
  /**
   * The total number of replies (not including the top level comment).
   */
  totalReplyCount?: number | null;
  /**
   * The ID of the video the comments refer to, if any. No video_id implies a channel discussion comment.
   */
  videoId?: string | null;
}
/**
 * Ratings schemes. The country-specific ratings are mostly for movies and shows. LINT.IfChange
 */
export interface ContentRating {
  /**
   * The video&#39;s Australian Classification Board (ACB) or Australian Communications and Media Authority (ACMA) rating. ACMA ratings are used to classify children&#39;s television programming.
   */
  acbRating?: string | null;
  /**
   * The video&#39;s rating from Italy&#39;s Autorit&amp;agrave; per le Garanzie nelle Comunicazioni (AGCOM).
   */
  agcomRating?: string | null;
  /**
   * The video&#39;s Anatel (Asociaci&amp;oacute;n Nacional de Televisi&amp;oacute;n) rating for Chilean television.
   */
  anatelRating?: string | null;
  /**
   * The video&#39;s British Board of Film Classification (BBFC) rating.
   */
  bbfcRating?: string | null;
  /**
   * The video&#39;s rating from Thailand&#39;s Board of Film and Video Censors.
   */
  bfvcRating?: string | null;
  /**
   * The video&#39;s rating from the Austrian Board of Media Classification (Bundesministerium f&amp;uuml;r Unterricht, Kunst und Kultur).
   */
  bmukkRating?: string | null;
  /**
   * The video&#39;s rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian French-language broadcasts. For more information, see the &lt;a href=&quot;http://www.cbsc.ca/english/agvot/frenchsystem.php&quot;&gt;Canadian Broadcast Standards Council&lt;/a&gt; website.
   */
  catvfrRating?: string | null;
  /**
   * Rating system for Canadian TV - Canadian TV Classification System The video&#39;s rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian English-language broadcasts. For more information, see the &lt;a href=&quot;http://www.cbsc.ca/english/agvot/englishsystem.php&quot;&gt;Canadian Broadcast Standards Council&lt;/a&gt; website.
   */
  catvRating?: string | null;
  /**
   * The video&#39;s Central Board of Film Certification (CBFC - India) rating.
   */
  cbfcRating?: string | null;
  /**
   * The video&#39;s Consejo de Calificaci&amp;oacute;n Cinematogr&amp;aacute;fica (Chile) rating.
   */
  cccRating?: string | null;
  /**
   * The video&#39;s rating from Portugal&#39;s Comiss&amp;atilde;o de Classifica&amp;ccedil;&amp;atilde;o de Espect&amp;acute;culos.
   */
  cceRating?: string | null;
  /**
   * The video&#39;s rating in Switzerland.
   */
  chfilmRating?: string | null;
  /**
   * The video&#39;s Canadian Home Video Rating System (CHVRS) rating.
   */
  chvrsRating?: string | null;
  /**
   * The video&#39;s rating from the Commission de Contr&amp;ocirc;le des Films (Belgium).
   */
  cicfRating?: string | null;
  /**
   * The video&#39;s rating from Romania&#39;s CONSILIUL NATIONAL AL AUDIOVIZUALULUI (CNA).
   */
  cnaRating?: string | null;
  /**
   * Rating system in France - Commission de classification cinematographique
   */
  cncRating?: string | null;
  /**
   * The video&#39;s rating from France&#39;s Conseil sup&amp;eacute;rieur de l’audiovisuel, which rates broadcast content.
   */
  csaRating?: string | null;
  /**
   * The video&#39;s rating from Luxembourg&#39;s Commission de surveillance de la classification des films (CSCF).
   */
  cscfRating?: string | null;
  /**
   * The video&#39;s rating in the Czech Republic.
   */
  czfilmRating?: string | null;
  /**
   * The video&#39;s Departamento de Justi&amp;ccedil;a, Classifica&amp;ccedil;&amp;atilde;o, Qualifica&amp;ccedil;&amp;atilde;o e T&amp;iacute;tulos (DJCQT - Brazil) rating.
   */
  djctqRating?: string | null;
  /**
   * Reasons that explain why the video received its DJCQT (Brazil) rating.
   */
  djctqRatingReasons?: string[] | null;
  /**
   * Rating system in Turkey - Evaluation and Classification Board of the Ministry of Culture and Tourism
   */
  ecbmctRating?: string | null;
  /**
   * The video&#39;s rating in Estonia.
   */
  eefilmRating?: string | null;
  /**
   * The video&#39;s rating in Egypt.
   */
  egfilmRating?: string | null;
  /**
   * The video&#39;s Eirin (&amp;#26144;&amp;#20523;) rating. Eirin is the Japanese rating system.
   */
  eirinRating?: string | null;
  /**
   * The video&#39;s rating from Malaysia&#39;s Film Censorship Board.
   */
  fcbmRating?: string | null;
  /**
   * The video&#39;s rating from Hong Kong&#39;s Office for Film, Newspaper and Article Administration.
   */
  fcoRating?: string | null;
  /**
   * &lt;span class=&quot;deprecated&quot;&gt;This property has been deprecated. Use the &lt;code&gt;&lt;a href=&quot;#contentDetails.contentRating.cncRating&quot;&gt;contentDetails.contentRating.cncRating&lt;/a&gt;&lt;/code&gt; instead.&lt;/span&gt;
   */
  fmocRating?: string | null;
  /**
   * The video&#39;s rating from South Africa&#39;s Film and Publication Board.
   */
  fpbRating?: string | null;
  /**
   * Reasons that explain why the video received its FPB (South Africa) rating.
   */
  fpbRatingReasons?: string[] | null;
  /**
   * The video&#39;s Freiwillige Selbstkontrolle der Filmwirtschaft (FSK - Germany) rating.
   */
  fskRating?: string | null;
  /**
   * The video&#39;s rating in Greece.
   */
  grfilmRating?: string | null;
  /**
   * The video&#39;s Instituto de la Cinematograf&amp;iacute;a y de las Artes Audiovisuales (ICAA - Spain) rating.
   */
  icaaRating?: string | null;
  /**
   * The video&#39;s Irish Film Classification Office (IFCO - Ireland) rating. See the &lt;a href=&quot;http://www.ifco.ie/website/ifco/ifcoweb.nsf/web/classcatintro&quot;&gt;IFCO&lt;/a&gt; website for more information.
   */
  ifcoRating?: string | null;
  /**
   * The video&#39;s rating in Israel.
   */
  ilfilmRating?: string | null;
  /**
   * The video&#39;s INCAA (Instituto Nacional de Cine y Artes Audiovisuales - Argentina) rating.
   */
  incaaRating?: string | null;
  /**
   * The video&#39;s rating from the Kenya Film Classification Board.
   */
  kfcbRating?: string | null;
  /**
   * The video&#39;s NICAM/Kijkwijzer rating from the Nederlands Instituut voor de Classificatie van Audiovisuele Media (Netherlands).
   */
  kijkwijzerRating?: string | null;
  /**
   * The video&#39;s Korea Media Rating Board (&amp;#50689;&amp;#49345;&amp;#47932;&amp;#46321;&amp;#44553;&amp;#50948;&amp;#50896;&amp;#54924;) rating. The KMRB rates videos in South Korea.
   */
  kmrbRating?: string | null;
  /**
   * The video&#39;s rating from Indonesia&#39;s Lembaga Sensor Film.
   */
  lsfRating?: string | null;
  /**
   * The video&#39;s rating from Malta&#39;s Film Age-Classification Board.
   */
  mccaaRating?: string | null;
  /**
   * The video&#39;s rating from the Danish Film Institute&#39;s (Det Danske Filminstitut) Media Council for Children and Young People.
   */
  mccypRating?: string | null;
  /**
   * The video&#39;s rating system for Vietnam - MCST
   */
  mcstRating?: string | null;
  /**
   * The video&#39;s rating from Singapore&#39;s Media Development Authority (MDA) and, specifically, it&#39;s Board of Film Censors (BFC).
   */
  mdaRating?: string | null;
  /**
   * The video&#39;s rating from Medietilsynet, the Norwegian Media Authority.
   */
  medietilsynetRating?: string | null;
  /**
   * The video&#39;s rating from Finland&#39;s Kansallinen Audiovisuaalinen Instituutti (National Audiovisual Institute).
   */
  mekuRating?: string | null;
  /**
   * The rating system for MENA countries, a clone of MPAA. It is needed to prevent titles go live w/o additional QC check, since some of them can be inappropriate for the countries at all. See b/33408548 for more details.
   */
  menaMpaaRating?: string | null;
  /**
   * The video&#39;s rating from the Ministero dei Beni e delle Attivit&amp;agrave; Culturali e del Turismo (Italy).
   */
  mibacRating?: string | null;
  /**
   * The video&#39;s Ministerio de Cultura (Colombia) rating.
   */
  mocRating?: string | null;
  /**
   * The video&#39;s rating from Taiwan&#39;s Ministry of Culture (&amp;#25991;&amp;#21270;&amp;#37096;).
   */
  moctwRating?: string | null;
  /**
   * The video&#39;s Motion Picture Association of America (MPAA) rating.
   */
  mpaaRating?: string | null;
  /**
   * The rating system for trailer, DVD, and Ad in the US.  See http://movielabs.com/md/ratings/v2.3/html/US_MPAAT_Ratings.html.
   */
  mpaatRating?: string | null;
  /**
   * The video&#39;s rating from the Movie and Television Review and Classification Board (Philippines).
   */
  mtrcbRating?: string | null;
  /**
   * The video&#39;s rating in Poland.
   */
  nbcplRating?: string | null;
  /**
   * The video&#39;s rating from the Maldives National Bureau of Classification.
   */
  nbcRating?: string | null;
  /**
   * The video&#39;s rating from the &lt;a href=&quot;http://www.nfc.bg/&quot;&gt;Bulgarian National Film Center&lt;/a&gt;.
   */
  nfrcRating?: string | null;
  /**
   * The video&#39;s rating from Nigeria&#39;s National Film and Video Censors Board.
   */
  nfvcbRating?: string | null;
  /**
   * The video&#39;s rating from the Nacion&amp;atilde;lais Kino centrs (National Film Centre of Latvia).
   */
  nkclvRating?: string | null;
  /**
   * The National Media Council ratings system for United Arab Emirates.
   */
  nmcRating?: string | null;
  /**
   * The video&#39;s Office of Film and Literature Classification (OFLC - New Zealand) rating.
   */
  oflcRating?: string | null;
  /**
   * The video&#39;s rating in Peru.
   */
  pefilmRating?: string | null;
  /**
   * The video&#39;s rating from the Hungarian Nemzeti Filmiroda, the Rating Committee of the National Office of Film.
   */
  rcnofRating?: string | null;
  /**
   * The video&#39;s rating in Venezuela.
   */
  resorteviolenciaRating?: string | null;
  /**
   * The video&#39;s General Directorate of Radio, Television and Cinematography (Mexico) rating.
   */
  rtcRating?: string | null;
  /**
   * The video&#39;s rating from Ireland&#39;s Raidi&amp;oacute; Teilif&amp;iacute;s &amp;Eacute;ireann.
   */
  rteRating?: string | null;
  /**
   * The video&#39;s National Film Registry of the Russian Federation (MKRF - Russia) rating.
   */
  russiaRating?: string | null;
  /**
   * The video&#39;s rating in Slovakia.
   */
  skfilmRating?: string | null;
  /**
   * The video&#39;s rating in Iceland.
   */
  smaisRating?: string | null;
  /**
   * The video&#39;s rating from Statens medier&amp;aring;d (Sweden&#39;s National Media Council).
   */
  smsaRating?: string | null;
  /**
   * The video&#39;s TV Parental Guidelines (TVPG) rating.
   */
  tvpgRating?: string | null;
  /**
   * A rating that YouTube uses to identify age-restricted content.
   */
  ytRating?: string | null;
}
/**
 * Geographical coordinates of a point, in WGS84.
 */
export interface GeoPoint {
  /**
   * Altitude above the reference ellipsoid, in meters.
   */
  altitude?: number | null;
  /**
   * Latitude in degrees.
   */
  latitude?: number | null;
  /**
   * Longitude in degrees.
   */
  longitude?: number | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;guideCategory&lt;/strong&gt;&lt;/code&gt; resource identifies a category that YouTube algorithmically assigns based on a channel&#39;s content or other indicators, such as the channel&#39;s popularity. The list is similar to &lt;a href=\&quot;/youtube/v3/docs/videocategory.html\&quot;&gt;video categories&lt;/a&gt;, with the difference being that a video&#39;s uploader can assign a video category but only YouTube can assign a channel category.
 */
export interface GuideCategory {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the guide category.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#guideCategory&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the category, such as its title.
   */
  snippet?: GuideCategorySnippet;
}
export interface GuideCategoryListParameter extends StandardParameters {
  /**
   *
   */
  hl?: string;
  /**
   * Return the guide categories with the given IDs.
   */
  id?: string[];
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>guideCategory</code> resource properties that the API response will include. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];
  /**
   * Return all categories in the given region code.
   */
  regionCode?: string;
}
export interface GuideCategoryListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of categories that can be associated with YouTube channels. In this map, the category ID is the map key, and its value is the corresponding &lt;code&gt;guideCategory&lt;/code&gt; resource.
   */
  items?: GuideCategory[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#guideCategoryListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about a guide category.
 */
export interface GuideCategorySnippet {
  channelId?: string | null;
  /**
   * Description of the guide category.
   */
  title?: string | null;
}
/**
 * An &lt;code&gt;&lt;strong&gt;i18nLanguage&lt;/strong&gt;&lt;/code&gt; resource identifies a UI language currently supported by YouTube.
 */
export interface I18nLanguage {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the i18n language.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#i18nLanguage&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the i18n language, such as language code and human-readable name.
   */
  snippet?: I18nLanguageSnippet;
}
export interface I18nlanguageListParameter extends StandardParameters {
  /**
   *
   */
  hl?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>i18nLanguage</code> resource properties that the API response will include. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];
}
export interface I18nLanguageListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of supported i18n languages. In this map, the i18n language ID is the map key, and its value is the corresponding &lt;code&gt;i18nLanguage&lt;/code&gt; resource.
   */
  items?: I18nLanguage[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#i18nLanguageListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about an i18n language, such as language code and human-readable name.
 */
export interface I18nLanguageSnippet {
  /**
   * A short BCP-47 code that uniquely identifies a language.
   */
  hl?: string | null;
  /**
   * The human-readable name of the language in the language itself.
   */
  name?: string | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;i18nRegion&lt;/strong&gt;&lt;/code&gt; resource identifies a region where YouTube is available.
 */
export interface I18nRegion {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the i18n region.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#i18nRegion&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the i18n region, such as region code and human-readable name.
   */
  snippet?: I18nRegionSnippet;
}
export interface I18nregionListParameter extends StandardParameters {
  /**
   *
   */
  hl?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>i18nRegion</code> resource properties that the API response will include. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];
}
export interface I18nRegionListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of regions where YouTube is available. In this map, the i18n region ID is the map key, and its value is the corresponding &lt;code&gt;i18nRegion&lt;/code&gt; resource.
   */
  items?: I18nRegion[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#i18nRegionListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about an i18n region, such as region code and human-readable name.
 */
export interface I18nRegionSnippet {
  /**
   * The region code as a 2-letter ISO country code.
   */
  gl?: string | null;
  /**
   * The human-readable name of the region.
   */
  name?: string | null;
}
/**
 * Branding properties for images associated with the channel.
 */
export interface ImageSettings {
  /**
   * The URL for the background image shown on the video watch page. The image should be 1200px by 615px, with a maximum file size of 128k.
   */
  backgroundImageUrl?: LocalizedProperty;
  /**
   * This is used only in update requests; if it&#39;s set, we use this URL to generate all of the above banner URLs.
   */
  bannerExternalUrl?: string | null;
  /**
   * Banner image. Desktop size (1060x175).
   */
  bannerImageUrl?: string | null;
  /**
   * Banner image. Mobile size high resolution (1440x395).
   */
  bannerMobileExtraHdImageUrl?: string | null;
  /**
   * Banner image. Mobile size high resolution (1280x360).
   */
  bannerMobileHdImageUrl?: string | null;
  /**
   * Banner image. Mobile size (640x175).
   */
  bannerMobileImageUrl?: string | null;
  /**
   * Banner image. Mobile size low resolution (320x88).
   */
  bannerMobileLowImageUrl?: string | null;
  /**
   * Banner image. Mobile size medium/high resolution (960x263).
   */
  bannerMobileMediumHdImageUrl?: string | null;
  /**
   * Banner image. Tablet size extra high resolution (2560x424).
   */
  bannerTabletExtraHdImageUrl?: string | null;
  /**
   * Banner image. Tablet size high resolution (2276x377).
   */
  bannerTabletHdImageUrl?: string | null;
  /**
   * Banner image. Tablet size (1707x283).
   */
  bannerTabletImageUrl?: string | null;
  /**
   * Banner image. Tablet size low resolution (1138x188).
   */
  bannerTabletLowImageUrl?: string | null;
  /**
   * Banner image. TV size high resolution (1920x1080).
   */
  bannerTvHighImageUrl?: string | null;
  /**
   * Banner image. TV size extra high resolution (2120x1192).
   */
  bannerTvImageUrl?: string | null;
  /**
   * Banner image. TV size low resolution (854x480).
   */
  bannerTvLowImageUrl?: string | null;
  /**
   * Banner image. TV size medium resolution (1280x720).
   */
  bannerTvMediumImageUrl?: string | null;
  /**
   * The image map script for the large banner image.
   */
  largeBrandedBannerImageImapScript?: LocalizedProperty;
  /**
   * The URL for the 854px by 70px image that appears below the video player in the expanded video view of the video watch page.
   */
  largeBrandedBannerImageUrl?: LocalizedProperty;
  /**
   * The image map script for the small banner image.
   */
  smallBrandedBannerImageImapScript?: LocalizedProperty;
  /**
   * The URL for the 640px by 70px banner image that appears below the video player in the default view of the video watch page. The URL for the image that appears above the top-left corner of the video player. This is a 25-pixel-high image with a flexible width that cannot exceed 170 pixels.
   */
  smallBrandedBannerImageUrl?: LocalizedProperty;
  /**
   * The URL for a 1px by 1px tracking pixel that can be used to collect statistics for views of the channel or video pages.
   */
  trackingImageUrl?: string | null;
  watchIconImageUrl?: string | null;
}
/**
 * Describes information necessary for ingesting an RTMP or an HTTP stream.
 */
export interface IngestionInfo {
  /**
   * The backup ingestion URL that you should use to stream video to YouTube. You have the option of simultaneously streaming the content that you are sending to the &lt;code&gt;ingestionAddress&lt;/code&gt; to this URL.
   */
  backupIngestionAddress?: string | null;
  /**
   * The primary ingestion URL that you should use to stream video to YouTube. You must stream video to this URL.&lt;br&gt;&lt;br&gt; Depending on which application or tool you use to encode your video stream, you may need to enter the stream URL and stream name separately or you may need to concatenate them in the following format:&lt;br&gt;&lt;pre&gt;&lt;strong&gt;STREAM_URL/STREAM_NAME&lt;/strong&gt;&lt;/pre&gt;
   */
  ingestionAddress?: string | null;
  /**
   * This ingestion url may be used instead of &lt;code&gt;backupIngestionAddress&lt;/code&gt; in order to stream via RTMPS. Not applicable to non-RTMP streams.
   */
  rtmpsBackupIngestionAddress?: string | null;
  /**
   * This ingestion url may be used instead of &lt;code&gt;ingestionAddress&lt;/code&gt; in order to stream via RTMPS. Not applicable to non-RTMP streams.
   */
  rtmpsIngestionAddress?: string | null;
  /**
   * The HTTP or RTMP stream name that YouTube assigns to the video stream.
   */
  streamName?: string | null;
}
/**
 * LINT.IfChange Describes an invideo branding.
 */
export interface InvideoBranding {
  /**
   * The bytes the uploaded image. Only used in api to youtube communication.
   */
  imageBytes?: string | null;
  /**
   * The url of the uploaded image. Only used in apiary to api communication.
   */
  imageUrl?: string | null;
  /**
   * The spatial position within the video where the branding watermark will be displayed.
   */
  position?: InvideoPosition;
  /**
   * The channel to which this branding links. If not present it defaults to the current channel.
   */
  targetChannelId?: string | null;
  /**
   * The temporal position within the video where watermark will be displayed.
   */
  timing?: InvideoTiming;
}
/**
 * Describes the spatial position of a visual widget inside a video. It is a union of various position types, out of which only will be set one.
 */
export interface InvideoPosition {
  /**
   * Describes in which corner of the video the visual widget will appear.
   */
  cornerPosition?: string | null;
  /**
   * Defines the position type.
   */
  type?: string | null;
}
/**
 * Describes an invideo promotion campaign consisting of multiple promoted items. A campaign belongs to a single channel_id.
 */
export interface InvideoPromotion {
  /**
   * The default temporal position within the video where the promoted item will be displayed. Can be overridden by more specific timing in the item.
   */
  defaultTiming?: InvideoTiming;
  /**
   * List of promoted items in decreasing priority.
   */
  items?: PromotedItem[];
  /**
   * The spatial position within the video where the promoted item will be displayed.
   */
  position?: InvideoPosition;
  /**
   * Indicates whether the channel&#39;s promotional campaign uses &quot;smart timing.&quot; This feature attempts to show promotions at a point in the video when they are more likely to be clicked and less likely to disrupt the viewing experience. This feature also picks up a single promotion to show on each video.
   */
  useSmartTiming?: boolean | null;
}
/**
 * Describes a temporal position of a visual widget inside a video.
 */
export interface InvideoTiming {
  /**
   * Defines the duration in milliseconds for which the promotion should be displayed. If missing, the client should use the default.
   */
  durationMs?: string | null;
  /**
   * Defines the time at which the promotion will appear. Depending on the value of &lt;code&gt;type&lt;/code&gt; the value of the &lt;code&gt;offsetMs&lt;/code&gt; field will represent a time offset from the start or from the end of the video, expressed in milliseconds.
   */
  offsetMs?: string | null;
  /**
   * Describes a timing type. If the value is &lt;code&gt;offsetFromStart&lt;/code&gt;, then the &lt;code&gt;offsetMs&lt;/code&gt; field represents an offset from the start of the video. If the value is &lt;code&gt;offsetFromEnd&lt;/code&gt;, then the &lt;code&gt;offsetMs&lt;/code&gt; field represents an offset from the end of the video.
   */
  type?: string | null;
}
export interface LanguageTag {
  value?: string | null;
}
export interface LevelDetails {
  /**
   * The name that should be used when referring to this level.
   */
  displayName?: string | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;liveBroadcast&lt;/strong&gt;&lt;/code&gt; resource represents an event that will be streamed, via live video, on YouTube.
 */
export interface LiveBroadcast {
  /**
   * The &lt;code&gt;contentDetails&lt;/code&gt; object contains information about the event&#39;s video content, such as whether the content can be shown in an embedded video player or if it will be archived and therefore available for viewing after the event has concluded.
   */
  contentDetails?: LiveBroadcastContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube assigns to uniquely identify the broadcast.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#liveBroadcast&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the event, including its title, description, start time, and end time.
   */
  snippet?: LiveBroadcastSnippet;
  /**
   * The &lt;code&gt;statistics&lt;/code&gt; object contains info about the event&#39;s current stats. These include concurrent viewers and total chat count. Statistics can change (in either direction) during the lifetime of an event. Statistics are only returned while the event is live.
   */
  statistics?: LiveBroadcastStatistics;
  /**
   * The &lt;code&gt;status&lt;/code&gt; object contains information about the event&#39;s status.
   */
  status?: LiveBroadcastStatus;
}
/**
 * Detailed settings of a broadcast.
 */
export interface LiveBroadcastContentDetails {
  /**
   * This value uniquely identifies the &lt;code&gt;&lt;a href=&quot;/youtube/v3/live/docs/liveStreams&quot;&gt;live stream&lt;/a&gt;&lt;/code&gt; bound to the broadcast.
   */
  boundStreamId?: string | null;
  /**
   * The date and time that the live stream referenced by &lt;code&gt;boundStreamId&lt;/code&gt; was last updated.
   */
  boundStreamLastUpdateTimeMs?: string | null;
  closedCaptionsType?: string | null;
  /**
   * This setting indicates whether auto start is enabled for this broadcast.  The default value for this property is &lt;code&gt;false&lt;/code&gt;.&lt;br&gt;&lt;br&gt;  This setting can only be used by Events.
   */
  enableAutoStart?: boolean | null;
  /**
   * This setting indicates whether auto stop is enabled for this broadcast. The default value for this property is &lt;code&gt;false&lt;/code&gt;.&lt;br&gt;&lt;br&gt; This setting can only be used by Events.
   */
  enableAutoStop?: boolean | null;
  /**
   * This setting indicates whether HTTP POST closed captioning is enabled for this broadcast. The ingestion URL of the closed captions is returned through the liveStreams API.  This is mutually exclusive with using the &lt;code&gt;closed_captions_type&lt;/code&gt; property, and is equivalent to setting &lt;code&gt;closed_captions_type&lt;/code&gt; to CLOSED_CAPTIONS_HTTP_POST.
   */
  enableClosedCaptions?: boolean | null;
  /**
   * This setting indicates whether YouTube should enable content encryption for the broadcast.
   */
  enableContentEncryption?: boolean | null;
  /**
   * This setting determines whether viewers can access DVR controls while watching the video. DVR controls enable the viewer to control the video playback experience by pausing, rewinding, or fast forwarding content. The default value for this property is &lt;code&gt;true&lt;/code&gt;.&lt;br&gt;&lt;br&gt;  &lt;strong&gt;Important:&lt;/strong&gt; You must set the value to &lt;code&gt;true&lt;/code&gt; and also set the &lt;code&gt;enableArchive&lt;/code&gt; property&#39;s value to &lt;code&gt;true&lt;/code&gt; if you want to make playback available immediately after the broadcast ends.
   */
  enableDvr?: boolean | null;
  /**
   * This setting indicates whether the broadcast video can be played in an embedded player. If you choose to archive the video (using the &lt;code&gt;enableArchive&lt;/code&gt; property), this setting will also apply to the archived video.
   */
  enableEmbed?: boolean | null;
  /**
   * Indicates whether this broadcast has low latency enabled.
   */
  enableLowLatency?: boolean | null;
  /**
   * If both this and enable_low_latency are set, they must match. LATENCY_NORMAL should match enable_low_latency=false LATENCY_LOW should match enable_low_latency=true LATENCY_ULTRA_LOW should have enable_low_latency omitted.
   */
  latencyPreference?: string | null;
  /**
   * The mesh for projecting the video if &lt;code&gt;projection&lt;/code&gt; is &lt;code&gt;mesh&lt;/code&gt;. The mesh value must be a UTF-8 string containing the base-64 encoding of 3D mesh data that follows the &lt;a href=&quot;https://github.com/google/spatial-media/blob/master/docs/spherical-video-v2-rfc.md&quot;&gt; Spherical Video V2 RFC specification&lt;/a&gt; for an mshp box, excluding the box size and type but including the following four reserved zero bytes for the version and flags.
   */
  mesh?: string | null;
  /**
   * The &lt;code&gt;monitorStream&lt;/code&gt; object contains information about the monitor stream, which the broadcaster can use to review the event content before the broadcast stream is shown publicly.
   */
  monitorStream?: MonitorStreamInfo;
  /**
   * The projection format of this broadcast. This defaults to &lt;code&gt;rectangular&lt;/code&gt;.
   */
  projection?: string | null;
  /**
   * Automatically start recording after the event goes live. The default value for this property is &lt;code&gt;true&lt;/code&gt;.&lt;br&gt;&lt;br&gt;  &lt;strong&gt;Important:&lt;/strong&gt; You must also set the &lt;code&gt;enableDvr&lt;/code&gt; property&#39;s value to &lt;code&gt;true&lt;/code&gt; if you want the playback to be available immediately after the broadcast ends. If you set this property&#39;s value to &lt;code&gt;true&lt;/code&gt; but do not also set the &lt;code&gt;enableDvr&lt;/code&gt; property to &lt;code&gt;true&lt;/code&gt;, there may be a delay of around one day before the archived video will be available for playback.
   */
  recordFromStart?: boolean | null;
  /**
   * This setting indicates whether the broadcast should automatically begin with an &lt;a href=&quot;/youtube/v3/live/getting-started#Displaying_Slates&quot;&gt;in-stream slate&lt;/a&gt; when you update the broadcast&#39;s status to &lt;code&gt;live&lt;/code&gt;. After updating the status, you then need to send a &lt;code&gt;&lt;a href=&quot;/youtube/v3/live/docs/liveCuepoints/insert&quot;&gt;liveCuepoints.insert&lt;/a&gt;&lt;/code&gt; request that sets the cuepoint&#39;s &lt;code&gt;eventState&lt;/code&gt; to &lt;code&gt;end&lt;/code&gt; to remove the in-stream slate and make your broadcast stream visible to viewers.
   */
  startWithSlate?: boolean | null;
}
export interface LivebroadcastBindParameter extends StandardParameters {
  /**
   * Broadcast to bind to the stream
   */
  id?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>liveBroadcast</code> resource properties that the API response will include. The <code>part</code> names that you can include in the parameter value are <code>id</code>, <code>snippet</code>, <code>contentDetails</code>, and <code>status</code>.
   */
  part?: string[];
  /**
   * Stream to bind, if not set unbind the current one.
   */
  streamId?: string;
}
export interface LivebroadcastControlParameter extends StandardParameters {
  /**
   * Whether display or hide slate.
   */
  displaySlate?: boolean;
  /**
   * Broadcast to operate.
   */
  id?: string;
  /**
   * The exact time when the actions (e.g. slate on) are executed. It is an offset from the first frame of the monitor stream. If not set, it means "now" or ASAP. This field should not be set if the monitor stream is disabled, otherwise an error will be returned.
   */
  offsetTimeMs?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>liveBroadcast</code> resource properties that the API response will include. The <code>part</code> names that you can include in the parameter value are <code>id</code>, <code>snippet</code>, <code>contentDetails</code>, and <code>status</code>.
   */
  part?: string[];
  /**
   * The wall clock time at which the action should be executed. Only one of offset_time_ms and walltime may be set at a time.
   */
  walltime?: string;
}
export interface LivebroadcastDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
}
export interface LivebroadcastInsertParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br><br>The <code>part</code> properties that you can include in the parameter value are <code>id</code>, <code>snippet</code>, <code>contentDetails</code>, and <code>status</code>.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: LiveBroadcast;
}
export interface LivebroadcastListParameter extends StandardParameters {
  /**
   * Return broadcasts with a certain status, e.g. active broadcasts.
   */
  broadcastStatus?: string;
  /**
   * Return only broadcasts with the selected type.
   */
  broadcastType?: string;
  /**
   * Return broadcasts with the given ids from Stubby or Apiary.
   */
  id?: string[];
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   *
   */
  mine?: boolean;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>liveBroadcast</code> resource properties that the API response will include. The <code>part</code> names that you can include in the parameter value are <code>id</code>, <code>snippet</code>, <code>contentDetails</code>, and <code>status</code>.
   */
  part?: string[];
}
export interface LivebroadcastTransitionParameter extends StandardParameters {
  /**
   * The status to which the broadcast is going to transition.
   */
  broadcastStatus?: string;
  /**
   * Broadcast to transition.
   */
  id?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>liveBroadcast</code> resource properties that the API response will include. The <code>part</code> names that you can include in the parameter value are <code>id</code>, <code>snippet</code>, <code>contentDetails</code>, and <code>status</code>.
   */
  part?: string[];
}
export interface LivebroadcastUpdateParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br><br>The <code>part</code> properties that you can include in the parameter value are <code>id</code>, <code>snippet</code>, <code>contentDetails</code>, and <code>status</code>.<br><br>Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a broadcast's privacy status is defined in the <code>status</code> part. As such, if your request is updating a private or unlisted broadcast, and the request's <code>part</code> parameter value includes the <code>status</code> part, the broadcast's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the broadcast will revert to the default privacy setting.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: LiveBroadcast;
}
export interface LiveBroadcastBindResponse extends LiveBroadcast {}
export interface LiveBroadcastControlResponse extends LiveBroadcast {}
export interface LiveBroadcastInsertResponse extends LiveBroadcast {}
export interface LiveBroadcastTransitionResponse extends LiveBroadcast {}
export interface LiveBroadcastUpdateResponse extends LiveBroadcast {}
export interface LiveBroadcastListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of broadcasts that match the request criteria.
   */
  items?: LiveBroadcast[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#liveBroadcastListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic broadcast information.
 */
export interface LiveBroadcastSnippet {
  /**
   * The date and time that the broadcast actually ended. This information is only available once the broadcast&#39;s state is &lt;code&gt;complete&lt;/code&gt;. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  actualEndTime?: string | null;
  /**
   * The date and time that the broadcast actually started. This information is only available once the broadcast&#39;s state is &lt;code&gt;live&lt;/code&gt;. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  actualStartTime?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the channel that is publishing the broadcast.
   */
  channelId?: string | null;
  /**
   * The broadcast&#39;s description. As with the &lt;code&gt;title&lt;/code&gt;, you can set this field by modifying the broadcast resource or by setting the &lt;code&gt;&lt;a href=&quot;/youtube/v3/docs/videos#snippet.description&quot;&gt;description&lt;/a&gt;&lt;/code&gt; field of the corresponding video resource.
   */
  description?: string | null;
  /**
   * Indicates whether this broadcast is the default broadcast. Internal only.
   */
  isDefaultBroadcast?: boolean | null;
  /**
   * The id of the live chat for this broadcast.
   */
  liveChatId?: string | null;
  /**
   * The date and time that the broadcast was added to YouTube&#39;s live broadcast schedule. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * The date and time that the broadcast is scheduled to end. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  scheduledEndTime?: string | null;
  /**
   * The date and time that the broadcast is scheduled to start. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  scheduledStartTime?: string | null;
  /**
   * A map of thumbnail images associated with the broadcast. For each nested object in this object, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The broadcast&#39;s title. Note that the broadcast represents exactly one YouTube video. You can set this field by modifying the broadcast resource or by setting the &lt;code&gt;&lt;a href=&quot;/youtube/v3/docs/videos#snippet.title&quot;&gt;title&lt;/a&gt;&lt;/code&gt; field of the corresponding video resource.
   */
  title?: string | null;
}
/**
 * Statistics about the live broadcast. These represent a snapshot of the values at the time of the request. Statistics are only returned for live broadcasts.
 */
export interface LiveBroadcastStatistics {
  /**
   * The total number of live chat messages currently on the broadcast. The property and its value will be present if the broadcast is public, has the live chat feature enabled, and has at least one message. Note that this field will not be filled after the broadcast ends. So this property would not identify the number of chat messages for an archived video of a completed live broadcast.
   */
  totalChatCount?: string | null;
}
/**
 * Live broadcast state.
 */
export interface LiveBroadcastStatus {
  /**
   * The broadcast&#39;s status. The status can be updated using the API&#39;s &lt;code&gt;&lt;a href=&quot;/youtube/v3/live/docs/liveBroadcasts/transition&quot; &gt;liveBroadcasts.transition&lt;/a&gt;&lt;/code&gt; method.
   */
  lifeCycleStatus?: string | null;
  /**
   * Priority of the live broadcast event (internal state).
   */
  liveBroadcastPriority?: string | null;
  /**
   * Whether the broadcast is made for kids or not, decided by YouTube instead of the creator. This field is read only.
   */
  madeForKids?: boolean | null;
  /**
   * The broadcast&#39;s privacy status. Note that the broadcast represents exactly one YouTube video, so the privacy settings are identical to those supported for videos. In addition, you can set this field by modifying the broadcast resource or by setting the &lt;code&gt;&lt;a href=&quot;/youtube/v3/docs/videos#status.privacyStatus&quot; &gt;privacyStatus&lt;/a&gt;&lt;/code&gt; field of the corresponding video resource.
   */
  privacyStatus?: string | null;
  /**
   * The broadcast&#39;s recording status.
   */
  recordingStatus?: string | null;
  /**
   * This field will be set to True if the creator declares the broadcast to be kids only: go/live-cw-work.
   */
  selfDeclaredMadeForKids?: boolean | null;
}
/**
 * A `__liveChatBan__` resource represents a ban for a YouTube live chat.
 */
export interface LiveChatBan {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube assigns to uniquely identify the ban.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string `&quot;youtube#liveChatBan&quot;`.
   */
  kind?: string | null;
  /**
   * The `snippet` object contains basic details about the ban.
   */
  snippet?: LiveChatBanSnippet;
}
export interface LiveChatBanDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
}
export interface LiveChatBanInsertParameter extends StandardParameters {
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: LiveChatBan;
}
export interface LiveChatBanInsertResponse extends LiveChatBan {}
export interface LiveChatBanSnippet {
  /**
   * The duration of a ban, only filled if the ban has type TEMPORARY.
   */
  banDurationSeconds?: string | null;
  bannedUserDetails?: ChannelProfileDetails;
  /**
   * The chat this ban is pertinent to.
   */
  liveChatId?: string | null;
  /**
   * The type of ban.
   */
  type?: string | null;
}
export interface LiveChatFanFundingEventDetails {
  /**
   * A rendered string that displays the fund amount and currency to the user.
   */
  amountDisplayString?: string | null;
  /**
   * The amount of the fund.
   */
  amountMicros?: string | null;
  /**
   * The currency in which the fund was made.
   */
  currency?: string | null;
  /**
   * The comment added by the user to this fan funding event.
   */
  userComment?: string | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;liveChatMessage&lt;/strong&gt;&lt;/code&gt; resource represents a chat message in a YouTube Live Chat.
 */
export interface LiveChatMessage {
  /**
   * The &lt;code&gt;authorDetails&lt;/code&gt; object contains basic details about the user that posted this message.
   */
  authorDetails?: LiveChatMessageAuthorDetails;
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube assigns to uniquely identify the message.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#liveChatMessage&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the message.
   */
  snippet?: LiveChatMessageSnippet;
}
export interface LiveChatMessageAuthorDetails {
  /**
   * The YouTube channel ID.
   */
  channelId?: string | null;
  /**
   * The channel&#39;s URL.
   */
  channelUrl?: string | null;
  /**
   * The channel&#39;s display name.
   */
  displayName?: string | null;
  /**
   * Whether the author is a moderator of the live chat.
   */
  isChatModerator?: boolean | null;
  /**
   * Whether the author is the owner of the live chat.
   */
  isChatOwner?: boolean | null;
  /**
   * Whether the author is a sponsor of the live chat.
   */
  isChatSponsor?: boolean | null;
  /**
   * Whether the author&#39;s identity has been verified by YouTube.
   */
  isVerified?: boolean | null;
  /**
   * The channels&#39;s avatar URL.
   */
  profileImageUrl?: string | null;
}
export interface LiveChatMessageDeletedDetails {
  deletedMessageId?: string | null;
}
export interface LiveChatMessageDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
}
export interface LiveChatMessageInsertParameter extends StandardParameters {
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: LiveChatMessage;
}
export interface LiveChatMessageListParameter extends StandardParameters {
  /**
   * Specifies the localization language in which the system messages should be returned.
   */
  hl?: string;
  /**
   * The id of the live chat for which comments should be returned.
   */
  liveChatId?: string;
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> property identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>liveChatComment</code> resource parts that the API response will include. Supported values are <code>id</code> and <code>snippet</code>.
   */
  part?: string[];
  /**
   * Specifies the size of the profile image that should be returned for each user.
   */
  profileImageSize?: number;
}
export interface LiveChatMessageInsertResponse extends LiveChatMessage {}
export interface LiveChatMessageListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  items?: LiveChatMessage[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#liveChatMessageListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  nextPageToken?: string | null;
  /**
   * The date and time when the underlying stream went offline. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  offlineAt?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The amount of time the client should wait before polling again.
   */
  pollingIntervalMillis?: number | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
export interface LiveChatMessageRetractedDetails {
  retractedMessageId?: string | null;
}
export interface LiveChatMessageSnippet {
  /**
   * The ID of the user that authored this message, this field is not always filled. textMessageEvent - the user that wrote the message fanFundingEvent - the user that funded the broadcast newSponsorEvent - the user that just became a sponsor messageDeletedEvent - the moderator that took the action messageRetractedEvent - the author that retracted their message userBannedEvent - the moderator that took the action superChatEvent - the user that made the purchase
   */
  authorChannelId?: string | null;
  /**
   * Contains a string that can be displayed to the user. If this field is not present the message is silent, at the moment only messages of type TOMBSTONE and CHAT_ENDED_EVENT are silent.
   */
  displayMessage?: string | null;
  /**
   * Details about the funding event, this is only set if the type is &#39;fanFundingEvent&#39;.
   */
  fanFundingEventDetails?: LiveChatFanFundingEventDetails;
  /**
   * Whether the message has display content that should be displayed to users.
   */
  hasDisplayContent?: boolean | null;
  liveChatId?: string | null;
  messageDeletedDetails?: LiveChatMessageDeletedDetails;
  messageRetractedDetails?: LiveChatMessageRetractedDetails;
  /**
   * The date and time when the message was orignally published. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * Details about the Super Chat event, this is only set if the type is &#39;superChatEvent&#39;.
   */
  superChatDetails?: LiveChatSuperChatDetails;
  /**
   * Details about the Super Sticker event, this is only set if the type is &#39;superStickerEvent&#39;.
   */
  superStickerDetails?: LiveChatSuperStickerDetails;
  /**
   * Details about the text message, this is only set if the type is &#39;textMessageEvent&#39;.
   */
  textMessageDetails?: LiveChatTextMessageDetails;
  /**
   * The type of message, this will always be present, it determines the contents of the message as well as which fields will be present.
   */
  type?: string | null;
  userBannedDetails?: LiveChatUserBannedMessageDetails;
}
/**
 * A &lt;code&gt;&lt;strong&gt;liveChatModerator&lt;/strong&gt;&lt;/code&gt; resource represents a moderator for a YouTube live chat. A chat moderator has the ability to ban/unban users from a chat, remove message, etc.
 */
export interface LiveChatModerator {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube assigns to uniquely identify the moderator.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#liveChatModerator&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the moderator.
   */
  snippet?: LiveChatModeratorSnippet;
}
export interface LiveChatModeratorDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
}
export interface LiveChatModeratorInsertParameter extends StandardParameters {
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response returns. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: LiveChatModerator;
}
export interface LiveChatModeratorListParameter extends StandardParameters {
  /**
   * The id of the live chat for which moderators should be returned.
   */
  liveChatId?: string;
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>liveChatModerator</code> resource parts that the API response will include. Supported values are <code>id</code> and <code>snippet</code>.
   */
  part?: string[];
}
export interface LiveChatModeratorInsertResponse extends LiveChatModerator {}
export interface LiveChatModeratorListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of moderators that match the request criteria.
   */
  items?: LiveChatModerator[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#liveChatModeratorListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
export interface LiveChatModeratorSnippet {
  /**
   * The ID of the live chat this moderator can act on.
   */
  liveChatId?: string | null;
  /**
   * Details about the moderator.
   */
  moderatorDetails?: ChannelProfileDetails;
}
export interface LiveChatSuperChatDetails {
  /**
   * A rendered string that displays the fund amount and currency to the user.
   */
  amountDisplayString?: string | null;
  /**
   * The amount purchased by the user, in micros (1,750,000 micros = 1.75).
   */
  amountMicros?: string | null;
  /**
   * The currency in which the purchase was made.
   */
  currency?: string | null;
  /**
   * The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is &lt;code&gt;1&lt;/code&gt;.
   */
  tier?: number | null;
  /**
   * The comment added by the user to this Super Chat event.
   */
  userComment?: string | null;
}
export interface LiveChatSuperStickerDetails {
  /**
   * A rendered string that displays the fund amount and currency to the user.
   */
  amountDisplayString?: string | null;
  /**
   * The amount purchased by the user, in micros (1,750,000 micros = 1.75).
   */
  amountMicros?: string | null;
  /**
   * The currency in which the purchase was made.
   */
  currency?: string | null;
  /**
   * Information about the Super Sticker.
   */
  superStickerMetadata?: SuperStickerMetadata;
  /**
   * The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is &lt;code&gt;1&lt;/code&gt;.
   */
  tier?: number | null;
}
export interface LiveChatTextMessageDetails {
  /**
   * The user&#39;s message.
   */
  messageText?: string | null;
}
export interface LiveChatUserBannedMessageDetails {
  /**
   * The duration of the ban. This property is only present if the &lt;code&gt;banType&lt;/code&gt; is &lt;code&gt;temporary&lt;/code&gt;.
   */
  banDurationSeconds?: string | null;
  /**
   * The details of the user that was banned.
   */
  bannedUserDetails?: ChannelProfileDetails;
  /**
   * The type of ban.
   */
  banType?: string | null;
}
/**
 * A live stream describes a live ingestion point.
 */
export interface LiveStream {
  /**
   * The &lt;code&gt;cdn&lt;/code&gt; object defines the live stream&#39;s content delivery network (CDN) settings. These settings provide details about the manner in which you stream your content to YouTube.
   */
  cdn?: CdnSettings;
  /**
   * The &lt;code&gt;content_details&lt;/code&gt; object contains information about the stream, including the closed captions ingestion URL.
   */
  contentDetails?: LiveStreamContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube assigns to uniquely identify the stream.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#liveStream&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the stream, including its channel, title, and description.
   */
  snippet?: LiveStreamSnippet;
  /**
   * The &lt;code&gt;status&lt;/code&gt; object contains information about live stream&#39;s status.
   */
  status?: LiveStreamStatus;
}
export interface LiveStreamConfigurationIssue {
  /**
   * The long-form description of the issue and how to resolve it.
   */
  description?: string | null;
  /**
   * The short-form reason for this issue.
   */
  reason?: string | null;
  /**
   * How severe this issue is to the stream.
   */
  severity?: string | null;
  /**
   * The kind of error happening.
   */
  type?: string | null;
}
/**
 * Detailed settings of a stream.
 */
export interface LiveStreamContentDetails {
  /**
   * The ingestion URL where the closed captions of this stream are sent.
   */
  closedCaptionsIngestionUrl?: string | null;
  /**
   * Indicates whether the stream is reusable, which means that it can be bound to multiple broadcasts. It is common for broadcasters to reuse the same stream for many different broadcasts if those broadcasts occur at different times.&lt;br&gt;&lt;br&gt; If you set this value to &lt;code&gt;false&lt;/code&gt;, then the stream will not be reusable, which means that it can only be bound to one broadcast. Non-reusable streams differ from reusable streams in the following ways: &lt;ul&gt;   &lt;li&gt;A non-reusable stream can only be bound to one broadcast.&lt;/li&gt;   &lt;li&gt;A non-reusable stream might be deleted by an automated process     after the broadcast ends.&lt;/li&gt;   &lt;li&gt;The &lt;code&gt;&lt;a href=&quot;/youtube/v3/live/docs/liveStreams/list&quot;&gt;     liveStreams.list&lt;/a&gt;&lt;/code&gt; method does not list non-reusable streams     if you call the method and set the &lt;code&gt;mine&lt;/code&gt; parameter to     &lt;code&gt;true&lt;/code&gt;. The only way to use that method to retrieve the     resource for a non-reusable stream is to use the &lt;code&gt;id&lt;/code&gt;     parameter to identify the stream.&lt;/li&gt; &lt;/ul&gt;
   */
  isReusable?: boolean | null;
}
export interface LiveStreamHealthStatus {
  /**
   * The configurations issues on this stream
   */
  configurationIssues?: LiveStreamConfigurationIssue[];
  /**
   * The last time this status was updated (in seconds)
   */
  lastUpdateTimeSeconds?: string | null;
  /**
   * The status code of this stream
   */
  status?: string | null;
}
export interface LiveStreamDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
}
export interface LiveStreamInsertParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br><br>The <code>part</code> properties that you can include in the parameter value are <code>id</code>, <code>snippet</code>, <code>cdn</code>, and <code>status</code>.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: LiveStream;
}
export interface LiveStreamListParameter extends StandardParameters {
  /**
   * Return LiveStreams with the given ids from Stubby or Apiary.
   */
  id?: string[];
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   *
   */
  mine?: boolean;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>liveStream</code> resource properties that the API response will include. The <code>part</code> names that you can include in the parameter value are <code>id</code>, <code>snippet</code>, <code>cdn</code>, and <code>status</code>.
   */
  part?: string[];
}
export interface LiveStreamUpdateParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br><br>The <code>part</code> properties that you can include in the parameter value are <code>id</code>, <code>snippet</code>, <code>cdn</code>, and <code>status</code>.<br><br>Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. If the request body does not specify a value for a mutable property, the existing value for that property will be removed.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: LiveStream;
}
export interface LiveStreamInsertResponse extends LiveStream {}
export interface LiveStreamUpdateResponse extends LiveStream {}
export interface LiveStreamListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of live streams that match the request criteria.
   */
  items?: LiveStream[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#liveStreamListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
export interface LiveStreamSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the channel that is transmitting the stream.
   */
  channelId?: string | null;
  /**
   * The stream&#39;s description. The value cannot be longer than 10000 characters.
   */
  description?: string | null;
  isDefaultStream?: boolean | null;
  /**
   * The date and time that the stream was created. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * The stream&#39;s title. The value must be between 1 and 128 characters long.
   */
  title?: string | null;
}
/**
 * Brief description of the live stream status.
 */
export interface LiveStreamStatus {
  /**
   * The health status of the stream.
   */
  healthStatus?: LiveStreamHealthStatus;
  streamStatus?: string | null;
}
export interface LocalizedProperty {
  default?: string | null;
  /**
   * The language of the default property.
   */
  defaultLanguage?: LanguageTag;
  localized?: LocalizedString[];
}
export interface LocalizedString {
  language?: string | null;
  value?: string | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;member&lt;/strong&gt;&lt;/code&gt; resource represents a member for a YouTube channel. A member provides recurring monetary support to a creator and receives special benefits.
 */
export interface Member {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#member&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the member.
   */
  snippet?: MemberSnippet;
}
export interface MemberListParameter extends StandardParameters {
  /**
   * Comma separated list of channel IDs. Only data about members that are part of this list will be included in the response.
   */
  filterByMemberChannelId?: string;
  /**
   * Filter members in the results set to the ones that have access to a level.
   */
  hasAccessToLevel?: string;
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Parameter that specifies which channel members to return.
   */
  mode?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>member</code> resource parts that the API response will include. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];
}
export interface MemberListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of members that match the request criteria.
   */
  items?: Member[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#memberListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  pageInfo?: PageInfo;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
export interface MembershipsDetails {
  /**
   * Ids of all levels that the user has access to. This includes the currently active level and all other levels that are included because of a higher purchase.
   */
  accessibleLevels?: string[] | null;
  /**
   * Id of the highest level that the user has access to at the moment.
   */
  highestAccessibleLevel?: string | null;
  /**
   * Display name for the highest level that the user has access to at the moment.
   */
  highestAccessibleLevelDisplayName?: string | null;
  /**
   * Data about memberships duration without taking into consideration pricing levels.
   */
  membershipsDuration?: MembershipsDuration;
  /**
   * Data about memberships duration on particular pricing levels.
   */
  membershipsDurationAtLevels?: MembershipsDurationAtLevel[];
}
export interface MembershipsDuration {
  /**
   * The date and time when the user became a continuous member across all levels.
   */
  memberSince?: string | null;
  /**
   * The cumulative time the user has been a member across all levels in complete months (the time is rounded down to the nearest integer).
   */
  memberTotalDurationMonths?: number | null;
}
export interface MembershipsDurationAtLevel {
  /**
   * Pricing level ID.
   */
  level?: string | null;
  /**
   * The date and time when the user became a continuous member for the given level.
   */
  memberSince?: string | null;
  /**
   * The cumulative time the user has been a member for the given level in complete months (the time is rounded down to the nearest integer).
   */
  memberTotalDurationMonths?: number | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;membershipsLevel&lt;/strong&gt;&lt;/code&gt; resource represents an offer made by YouTube creators for their fans. Users can become members of the channel by joining one of the available levels. They will provide recurring monetary support and receives special benefits.
 */
export interface MembershipsLevel {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube assigns to uniquely identify the memberships level.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#membershipsLevelListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the level.
   */
  snippet?: MembershipsLevelSnippet;
}
export interface MembershipsLevelListParameter extends StandardParameters {
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>membershipsLevel</code> resource parts that the API response will include. Supported values are <code>id</code> and <code>snippet</code>.
   */
  part?: string[];
}
export interface MembershipsLevelListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of pricing levels offered by a creator to the fans.
   */
  items?: MembershipsLevel[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#membershipsLevelListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
export interface MembershipsLevelSnippet {
  /**
   * The id of the channel that&#39;s offering channel memberships.
   */
  creatorChannelId?: string | null;
  /**
   * Details about the pricing level.
   */
  levelDetails?: LevelDetails;
}
export interface MemberSnippet {
  /**
   * The id of the channel that&#39;s offering memberships.
   */
  creatorChannelId?: string | null;
  /**
   * Details about the member.
   */
  memberDetails?: ChannelProfileDetails;
  /**
   * Details about the user&#39;s membership.
   */
  membershipsDetails?: MembershipsDetails;
}
/**
 * Settings and Info of the monitor stream
 */
export interface MonitorStreamInfo {
  /**
   * If you have set the &lt;code&gt;&lt;a href=&quot;#enableMonitorStream&quot;&gt;enableMonitorStream&lt;/a&gt;&lt;/code&gt; property to &lt;code&gt;true&lt;/code&gt;, then this property determines the length of the live broadcast delay.
   */
  broadcastStreamDelayMs?: number | null;
  /**
   * HTML code that embeds a player that plays the monitor stream.
   */
  embedHtml?: string | null;
  /**
   * This value determines whether the monitor stream is enabled for the broadcast. If the monitor stream is enabled, then YouTube will broadcast the event content on a special stream intended only for the broadcaster&#39;s consumption. The broadcaster can use the stream to review the event content and also to identify the optimal times to insert cuepoints.&lt;br&gt;&lt;br&gt; You need to set this value to &lt;code&gt;true&lt;/code&gt; if you intend to have a broadcast delay for your event.&lt;br&gt;&lt;br&gt; &lt;strong&gt;Note:&lt;/strong&gt; This property cannot be updated once the broadcast is in the &lt;code&gt;testing&lt;/code&gt; or &lt;code&gt;live&lt;/code&gt; state.
   */
  enableMonitorStream?: boolean | null;
}
/**
 * Paging details for lists of resources, including total number of items available and number of resources returned in a single page.
 */
export interface PageInfo {
  /**
   * The number of results included in the API response.
   */
  resultsPerPage?: number | null;
  /**
   * The total number of results in the result set.
   */
  totalResults?: number | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;playlist&lt;/strong&gt;&lt;/code&gt; resource represents a YouTube playlist. A playlist is a collection of videos that can be viewed sequentially and shared with other users. A playlist can contain up to 200 videos, and YouTube does not limit the number of playlists that each user creates. By default, playlists are publicly visible to other users, but playlists can be public or private.  &lt;br/&gt;&lt;br/&gt; YouTube also uses playlists to identify special collections of videos for a channel, such as:   &lt;ul&gt;     &lt;li&gt;uploaded videos&lt;/li&gt;     &lt;li&gt;favorite videos&lt;/li&gt;     &lt;li&gt;positively rated (liked) videos&lt;/li&gt;     &lt;li&gt;watch history&lt;/li&gt;     &lt;li&gt;watch later&lt;/li&gt;   &lt;/ul&gt; To be more specific, these lists are associated with a channel, which is a collection of a person, group, or company&#39;s videos, playlists, and other YouTube information.  You can retrieve the playlist IDs for each of these lists from the &lt;code&gt;&lt;a href=\&quot;/youtube/v3/docs/channels\&quot;&gt; channel resource&lt;/a&gt;&lt;/code&gt; for a given channel.&lt;br/&gt;&lt;br/&gt; You can then use the &lt;code&gt; &lt;a href=\&quot;/youtube/v3/docs/playlistItems/list\&quot;&gt; playlistItems.list&lt;/a&gt;&lt;/code&gt; method to retrieve any of those lists. You can also add or remove items from those lists by calling the &lt;code&gt; &lt;a href=\&quot;/youtube/v3/docs/playlistItems/insert\&quot;&gt; playlistItems.insert&lt;/a&gt;&lt;/code&gt; and &lt;code&gt; &lt;a href=\&quot;/youtube/v3/docs/playlistItems/delete\&quot;&gt; playlistItems.delete&lt;/a&gt;&lt;/code&gt; methods.
 */
export interface Playlist {
  /**
   * The &lt;code&gt;contentDetails&lt;/code&gt; object contains information like video count.
   */
  contentDetails?: PlaylistContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the playlist.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#playlist&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * Localizations for different languages
   */
  localizations?: {[key: string]: PlaylistLocalization} | null;
  /**
   * The &lt;code&gt;player&lt;/code&gt; object contains information that you would use to play the playlist in an embedded player.
   */
  player?: PlaylistPlayer;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the playlist, such as its title and description.
   */
  snippet?: PlaylistSnippet;
  /**
   * The &lt;code&gt;status&lt;/code&gt; object contains status information for the playlist.
   */
  status?: PlaylistStatus;
}
export interface PlaylistContentDetails {
  /**
   * The number of videos in the playlist.
   */
  itemCount?: number | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;playlistItem&lt;/strong&gt;&lt;/code&gt; resource identifies another resource, such as a video, that is included in a playlist. In addition, the &lt;code&gt;playlistItem &lt;/code&gt; resource contains details about the included resource that pertain specifically to how that resource is used in that playlist.&lt;br/&gt;&lt;br/&gt; YouTube uses playlists to identify special collections of videos for a channel, such as:   &lt;ul&gt;     &lt;li&gt;uploaded videos&lt;/li&gt;     &lt;li&gt;favorite videos&lt;/li&gt;     &lt;li&gt;positively rated (liked) videos&lt;/li&gt;     &lt;li&gt;watch history&lt;/li&gt;     &lt;li&gt;watch later&lt;/li&gt;   &lt;/ul&gt;  To be more specific, these lists are associated with a channel, which is a collection of a person, group, or company&#39;s videos, playlists, and other YouTube information. &lt;br/&gt;&lt;br/&gt;  You can retrieve the playlist IDs for each of these lists from the &lt;code&gt; &lt;a href=\&quot;/youtube/v3/docs/channels\&quot;&gt;channel resource&lt;/a&gt; &lt;/code&gt; for a given channel. You can then use the &lt;code&gt; &lt;a href=\&quot;/youtube/v3/docs/playlistItems/list\&quot;&gt; playlistItems.list&lt;/a&gt;&lt;/code&gt; method to retrieve any of those lists. You can also add or remove items from those lists by calling the &lt;code&gt; &lt;a href=\&quot;/youtube/v3/docs/playlistItems/insert\&quot;&gt; playlistItems.insert&lt;/a&gt;&lt;/code&gt; and &lt;code&gt; &lt;a href=\&quot;/youtube/v3/docs/playlistItems/delete\&quot;&gt; playlistItems.delete&lt;/a&gt;&lt;/code&gt; methods. For example, if a user gives a positive rating to a video, you would insert that video into the liked videos playlist for that user&#39;s channel.
 */
export interface PlaylistItem {
  /**
   * The &lt;code&gt;contentDetails&lt;/code&gt; object is included in the resource if the included item is a YouTube video. The object contains additional information about the video.
   */
  contentDetails?: PlaylistItemContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the playlist item.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#playlistItem&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the playlist item, such as its title and position in the playlist.
   */
  snippet?: PlaylistItemSnippet;
  /**
   * The &lt;code&gt;status&lt;/code&gt; object contains information about the playlist item&#39;s privacy status.
   */
  status?: PlaylistItemStatus;
}
export interface PlaylistItemContentDetails {
  /**
   * The time, measured in seconds from the start of the video, when the video should stop playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) By default, assume that the &lt;code&gt;video.endTime&lt;/code&gt; is the end of the video.
   */
  endAt?: string | null;
  /**
   * A user-generated note for this item.
   */
  note?: string | null;
  /**
   * The time, measured in seconds from the start of the video, when the video should start playing. (The playlist owner can specify the times when the video should start and stop playing when the video is played in the context of the playlist.) The default value is &lt;code&gt;0&lt;/code&gt;.
   */
  startAt?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify a video. To &lt;a href=&quot;/youtube/v3/docs/video/list.html&quot;&gt;retrieve the &lt;code&gt;video&lt;/code&gt; resource&lt;/a&gt;, set the &lt;code&gt;id&lt;/code&gt; query parameter to this value in your API request.
   */
  videoId?: string | null;
  /**
   * The date and time that the video was published to YouTube. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  videoPublishedAt?: string | null;
}
export interface PlaylistItemDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}
export interface PlaylistItemInsertParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: PlaylistItem;
}
export interface PlaylistItemListParameter extends StandardParameters {
  /**
   *
   */
  id?: string[];
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>playlistItem</code> resource properties that the API response will include.<br><br>If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a <code>playlistItem</code> resource, the <code>snippet</code> property contains numerous fields, including the <code>title</code>, <code>description</code>, <code>position</code>, and <code>resourceId</code> properties. As such, if you set <code><strong>part=snippet</strong></code>, the API response will contain all of those properties.
   */
  part?: string[];
  /**
   * Return the playlist items within the given playlist.
   */
  playlistId?: string;
  /**
   * Return the playlist items associated with the given video ID.
   */
  videoId?: string;
}
export interface PlaylistItemUpdateParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br/><br/>Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a playlist item can specify a start time and end time, which identify the times portion of the video that should play when users watch the video in the playlist. If your request is updating a playlist item that sets these values, and the request's <code>part</code> parameter value includes the <code>contentDetails</code> part, the playlist item's start and end times will be updated to whatever value the request body specifies. If the request body does not specify values, the existing start and end times will be removed and replaced with the default settings.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: PlaylistItem;
}
export interface PlaylistItemInsertResponse extends PlaylistItem {}
export interface PlaylistItemUpdateResponse extends PlaylistItem {}
export interface PlaylistItemListResponse {
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of playlist items that match the request criteria.
   */
  items?: PlaylistItem[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#playlistItemListResponse&quot;&lt;/code&gt;. Etag of this resource.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about a playlist, including title, description and thumbnails. Basic details of a YouTube Playlist item provided by the author. Next ID: 13
 */
export interface PlaylistItemSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the user that added the item to the playlist.
   */
  channelId?: string | null;
  /**
   * Channel title for the channel that the playlist item belongs to.
   */
  channelTitle?: string | null;
  /**
   * The item&#39;s description.
   */
  description?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in.
   */
  playlistId?: string | null;
  /**
   * The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of &lt;code&gt;0&lt;/code&gt;, the second item has a position of &lt;code&gt;1&lt;/code&gt;, and so forth.
   */
  position?: number | null;
  /**
   * The date and time that the item was added to the playlist. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * The &lt;code&gt;id&lt;/code&gt; object contains information that can be used to uniquely identify the resource that is included in the playlist as the playlist item.
   */
  resourceId?: ResourceId;
  /**
   * A map of thumbnail images associated with the playlist item. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The item&#39;s title.
   */
  title?: string | null;
}
/**
 * Information about the playlist item&#39;s privacy status.
 */
export interface PlaylistItemStatus {
  /**
   * This resource&#39;s privacy status.
   */
  privacyStatus?: string | null;
}
export interface PlaylistDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}
export interface PlaylistInsertParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: Playlist;
}
export interface PlaylistListParameter extends StandardParameters {
  /**
   * Return the playlists owned by the specified channel ID.
   */
  channelId?: string;
  /**
   * Returen content in specified language
   */
  hl?: string;
  /**
   * Return the playlists with the given IDs for Stubby or Apiary.
   */
  id?: string[];
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Return the playlists owned by the authenticated user.
   */
  mine?: boolean;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>playlist</code> resource properties that the API response will include.<br><br>If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a <code>playlist</code> resource, the <code>snippet</code> property contains properties like <code>author</code>, <code>title</code>, <code>description</code>, <code>tags</code>, and <code>timeCreated</code>. As such, if you set <code><strong>part=snippet</strong></code>, the API response will contain all of those properties.
   */
  part?: string[];
}
export interface PlaylistUpdateParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br/><br/>Note that this method will override the existing values for mutable properties that are contained in any parts that the request body specifies. For example, a playlist's description is contained in the <code>snippet</code> part, which must be included in the request body. If the request does not specify a value for the <code>snippet.description</code> property, the playlist's existing description will be deleted.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: Playlist;
}
export interface PlaylistInsertResponse extends Playlist {}
export interface PlaylistUpdateResponse extends Playlist {}
export interface PlaylistListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of playlists that match the request criteria
   */
  items?: Playlist[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#playlistListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Playlist localization setting
 */
export interface PlaylistLocalization {
  /**
   * The localized strings for playlist&#39;s description.
   */
  description?: string | null;
  /**
   * The localized strings for playlist&#39;s title.
   */
  title?: string | null;
}
export interface PlaylistPlayer {
  /**
   * An &lt;code&gt;&amp;lt;iframe&amp;gt;&lt;/code&gt; tag that embeds a player that will play the playlist.
   */
  embedHtml?: string | null;
}
/**
 * Basic details about a playlist, including title, description and thumbnails.
 */
export interface PlaylistSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the channel that published the playlist.
   */
  channelId?: string | null;
  /**
   * The channel title of the channel that the video belongs to.
   */
  channelTitle?: string | null;
  /**
   * The language of the playlist&#39;s default title and description.
   */
  defaultLanguage?: string | null;
  /**
   * The playlist&#39;s description.
   */
  description?: string | null;
  /**
   * Localized title and description, read-only.
   */
  localized?: PlaylistLocalization;
  /**
   * The date and time that the playlist was created. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * Keyword tags associated with the playlist.
   */
  tags?: string[] | null;
  /**
   * A map of thumbnail images associated with the playlist. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The playlist&#39;s title.
   */
  title?: string | null;
}
export interface PlaylistStatus {
  /**
   * The playlist&#39;s privacy status.
   */
  privacyStatus?: string | null;
}
/**
 * Describes a single promoted item.
 */
export interface PromotedItem {
  /**
   * A custom message to display for this promotion. This field is currently ignored unless the promoted item is a website.
   */
  customMessage?: string | null;
  /**
   * Identifies the promoted item.
   */
  id?: PromotedItemId;
  /**
   * If true, the content owner&#39;s name will be used when displaying the promotion. This field can only be set when the update is made on behalf of the content owner.
   */
  promotedByContentOwner?: boolean | null;
  /**
   * The temporal position within the video where the promoted item will be displayed. If present, it overrides the default timing.
   */
  timing?: InvideoTiming;
}
/**
 * Describes a single promoted item id. It is a union of various possible types.
 */
export interface PromotedItemId {
  /**
   * If type is recentUpload, this field identifies the channel from which to take the recent upload. If missing, the channel is assumed to be the same channel for which the invideoPromotion is set.
   */
  recentlyUploadedBy?: string | null;
  /**
   * Describes the type of the promoted item.
   */
  type?: string | null;
  /**
   * If the promoted item represents a video, this field represents the unique YouTube ID identifying it. This field will be present only if &lt;code&gt;type&lt;/code&gt; has the value &lt;code&gt;video&lt;/code&gt;.
   */
  videoId?: string | null;
  /**
   * If the promoted item represents a website, this field represents the url pointing to the website. This field will be present only if &lt;code&gt;type&lt;/code&gt; has the value &lt;code&gt;website&lt;/code&gt;.
   */
  websiteUrl?: string | null;
}
/**
 * A pair Property / Value.
 */
export interface PropertyValue {
  /**
   * A property.
   */
  property?: string | null;
  /**
   * The property&#39;s value.
   */
  value?: string | null;
}
/**
 * A resource id is a generic reference that points to another YouTube resource.
 */
export interface ResourceId {
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the &lt;code&gt;resourceId.kind&lt;/code&gt; value is &lt;code&gt;youtube#channel&lt;/code&gt;.
   */
  channelId?: string | null;
  /**
   * The type of the API resource.
   */
  kind?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the &lt;code&gt;resourceId.kind&lt;/code&gt; value is &lt;code&gt;youtube#playlist&lt;/code&gt;.
   */
  playlistId?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the &lt;code&gt;resourceId.kind&lt;/code&gt; value is &lt;code&gt;youtube#video&lt;/code&gt;.
   */
  videoId?: string | null;
}
export interface SearchListParameter extends StandardParameters {
  /**
   * Filter on resources belonging to this channelId.
   */
  channelId?: string;
  /**
   * Add a filter on the channel search.
   */
  channelType?: string;
  /**
   * Filter on the livestream status of the videos.
   */
  eventType?: string;
  /**
   * Search owned by a content owner.
   */
  forContentOwner?: boolean;
  /**
   * Restrict the search to only retrieve videos uploaded using the project id of the authenticated user.
   */
  forDeveloper?: boolean;
  /**
   * Search for the private videos of the authenticated user.
   */
  forMine?: boolean;
  /**
   * Filter on location of the video
   */
  location?: string;
  /**
   * Filter on distance from the location (specified above).
   */
  locationRadius?: string;
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * Sort order of the results.
   */
  order?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>search</code> resource properties that the API response will include. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];
  /**
   * Filter on resources published after this date.
   */
  publishedAfter?: string;
  /**
   * Filter on resources published before this date.
   */
  publishedBefore?: string;
  /**
   * Textual search terms to match.
   */
  q?: string;
  /**
   * Display the content as seen by viewers in this country.
   */
  regionCode?: string;
  /**
   * Search related to a resource.
   */
  relatedToVideoId?: string;
  /**
   * Return results relevant to this language.
   */
  relevanceLanguage?: string;
  /**
   * Indicates whether the search results should include restricted content as well as standard content.
   */
  safeSearch?: string;
  /**
   * Restrict results to a particular topic.
   */
  topicId?: string;
  /**
   * Restrict results to a particular set of resource types from One Platform.
   */
  type?: string[];
  /**
   * Filter on the presence of captions on the videos.
   */
  videoCaption?: string;
  /**
   * Filter on videos in a specific category.
   */
  videoCategoryId?: string;
  /**
   * Filter on the definition of the videos.
   */
  videoDefinition?: string;
  /**
   * Filter on 3d videos.
   */
  videoDimension?: string;
  /**
   * Filter on the duration of the videos.
   */
  videoDuration?: string;
  /**
   * Filter on embeddable videos.
   */
  videoEmbeddable?: string;
  /**
   * Filter on the license of the videos.
   */
  videoLicense?: string;
  /**
   * Filter on syndicated videos.
   */
  videoSyndicated?: string;
  /**
   * Filter on videos of a specific type.
   */
  videoType?: string;
}
export interface SearchListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * Pagination information for token pagination.
   */
  items?: SearchResult[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#searchListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  regionCode?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * A search result contains information about a YouTube video, channel, or playlist that matches the search parameters specified in an API request. While a search result points to a uniquely identifiable resource, like a video, it does not have its own persistent data.
 */
export interface SearchResult {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The &lt;code&gt;id&lt;/code&gt; object contains information that can be used to uniquely identify the resource that matches the search request.
   */
  id?: ResourceId;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#searchResult&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about a search result, such as its title or description. For example, if the search result is a video, then the title will be the video&#39;s title and the description will be the video&#39;s description.
   */
  snippet?: SearchResultSnippet;
}
/**
 * Basic details about a search result, including title, description and thumbnails of the item referenced by the search result.
 */
export interface SearchResultSnippet {
  /**
   * The value that YouTube uses to uniquely identify the channel that published the resource that the search result identifies.
   */
  channelId?: string | null;
  /**
   * The title of the channel that published the resource that the search result identifies.
   */
  channelTitle?: string | null;
  /**
   * A description of the search result.
   */
  description?: string | null;
  /**
   * It indicates if the resource (video or channel) has upcoming/active live broadcast content. Or it&#39;s &quot;none&quot; if there is not any upcoming/active live broadcasts.
   */
  liveBroadcastContent?: string | null;
  /**
   * The creation date and time of the resource that the search result identifies. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * A map of thumbnail images associated with the search result. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The title of the search result.
   */
  title?: string | null;
}
/**
 * A `__sponsor__` resource represents a sponsor for a YouTube channel.  A sponsor provides recurring monetary support to a creator and receives special benefits.
 */
export interface Sponsor {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string `&quot;youtube#sponsor&quot;`.
   */
  kind?: string | null;
  /**
   * The `snippet` object contains basic details about the sponsor.
   */
  snippet?: SponsorSnippet;
}
export interface SponsorListParameter extends StandardParameters {
  /**
   * Parameter that specifies which channel sponsors to return.
   */
  filter?: string;
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>sponsor</code> resource parts that the API response will include. Supported values are <code>id</code> and <code>snippet</code>.
   */
  part?: string[];
}
export interface SponsorListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of sponsors that match the request criteria.
   */
  items?: Sponsor[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string `&quot;youtube#sponsorListResponse&quot;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the `pageToken` parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  pageInfo?: PageInfo;
  tokenPagination?: TokenPagination;
  /**
   * The `visitorId` identifies the visitor.
   */
  visitorId?: string | null;
}
export interface SponsorSnippet {
  /**
   * The id of the channel being sponsored.
   */
  channelId?: string | null;
  /**
   * The cumulative time a user has been a sponsor in months.
   */
  cumulativeDurationMonths?: number | null;
  /**
   * Details about the sponsor.
   */
  sponsorDetails?: ChannelProfileDetails;
  /**
   * The date and time when the user became a sponsor. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; (`YYYY-MM-DDThh:mm:ss.sZ`) format.
   */
  sponsorSince?: string | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;subscription&lt;/strong&gt;&lt;/code&gt; resource contains information about a YouTube user subscription.  A subscription notifies a user when new videos are added to a channel or when another user takes one of several actions on YouTube, such as uploading a video, rating a video, or commenting on a video.
 */
export interface Subscription {
  /**
   * The &lt;code&gt;contentDetails&lt;/code&gt; object contains basic statistics about the subscription.
   */
  contentDetails?: SubscriptionContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the subscription.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#subscription&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the subscription, including its title and the channel that the user subscribed to.
   */
  snippet?: SubscriptionSnippet;
  /**
   * The &lt;code&gt;subscriberSnippet&lt;/code&gt; object contains basic details about the subscriber.
   */
  subscriberSnippet?: SubscriptionSubscriberSnippet;
}
/**
 * Details about the content to witch a subscription refers.
 */
export interface SubscriptionContentDetails {
  /**
   * The type of activity this subscription is for (only uploads, everything).
   */
  activityType?: string | null;
  /**
   * The number of new items in the subscription since its content was last read.
   */
  newItemCount?: number | null;
  /**
   * The approximate number of items that the subscription points to.
   */
  totalItemCount?: number | null;
}
export interface SubscriptionDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
}
export interface SubscriptionInsertParameter extends StandardParameters {
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: Subscription;
}
export interface SubscriptionListParameter extends StandardParameters {
  /**
   * Return the subscriptions of the given channel owner.
   */
  channelId?: string;
  /**
   * Return the subscriptions to the subset of these channels that the authenticated user is subscribed to.
   */
  forChannelId?: string;
  /**
   * Return the subscriptions with the given IDs for Stubby or Apiary.
   */
  id?: string[];
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * Flag for returning the subscriptions of the authenticated user.
   */
  mine?: boolean;
  /**
   *
   */
  myRecentSubscribers?: boolean;
  /**
   * Return the subscribers of the given channel owner.
   */
  mySubscribers?: boolean;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The order of the returned subscriptions
   */
  order?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>subscription</code> resource properties that the API response will include.<br><br>If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a <code>subscription</code> resource, the <code>snippet</code> property contains other properties, such as a display title for the subscription. If you set <code><strong>part=snippet</strong></code>, the API response will also contain all of those nested properties.
   */
  part?: string[];
}
export interface SubscriptionInsertResponse extends Subscription {}
export interface SubscriptionListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of subscriptions that match the request criteria.
   */
  items?: Subscription[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#subscriptionListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about a subscription, including title, description and thumbnails of the subscribed item.
 */
export interface SubscriptionSnippet {
  /**
   * The ID that YouTube uses to uniquely identify the subscriber&#39;s channel.
   */
  channelId?: string | null;
  /**
   * Channel title for the channel that the subscription belongs to.
   */
  channelTitle?: string | null;
  /**
   * The subscription&#39;s details.
   */
  description?: string | null;
  /**
   * The date and time that the subscription was created. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * The &lt;code&gt;id&lt;/code&gt; object contains information about the channel that the user subscribed to.
   */
  resourceId?: ResourceId;
  /**
   * A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The subscription&#39;s title.
   */
  title?: string | null;
}
/**
 * Basic details about a subscription&#39;s subscriber including title, description, channel ID and thumbnails.
 */
export interface SubscriptionSubscriberSnippet {
  /**
   * The channel ID of the subscriber.
   */
  channelId?: string | null;
  /**
   * The description of the subscriber.
   */
  description?: string | null;
  /**
   * Thumbnails for this subscriber.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The title of the subscriber.
   */
  title?: string | null;
}
/**
 * A `__superChatEvent__` resource represents a Super Chat purchase on a YouTube channel.
 */
export interface SuperChatEvent {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube assigns to uniquely identify the Super Chat event.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string `&quot;youtube#superChatEvent&quot;`.
   */
  kind?: string | null;
  /**
   * The `snippet` object contains basic details about the Super Chat event.
   */
  snippet?: SuperChatEventSnippet;
}
export interface SuperChatEventListParameter extends StandardParameters {
  /**
   * Return rendered funding amounts in specified language.
   */
  hl?: string;
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>superChatEvent</code> resource parts that the API response will include. Supported values are <code>id</code> and <code>snippet</code>.
   */
  part?: string[];
}
export interface SuperChatEventListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of Super Chat purchases that match the request criteria.
   */
  items?: SuperChatEvent[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#superChatEventListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  pageInfo?: PageInfo;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
export interface SuperChatEventSnippet {
  /**
   * The purchase amount, in micros of the purchase currency.  e.g., 1 is represented as 1000000.
   */
  amountMicros?: string | null;
  /**
   * Channel id where the event occurred.
   */
  channelId?: string | null;
  /**
   * The text contents of the comment left by the user.
   */
  commentText?: string | null;
  /**
   * The date and time when the event occurred. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  createdAt?: string | null;
  /**
   * The currency in which the purchase was made.  ISO 4217.
   */
  currency?: string | null;
  /**
   * A rendered string that displays the purchase amount and currency (e.g., &quot;$1.00&quot;).  The string is rendered for the given language.
   */
  displayString?: string | null;
  /**
   * True if this event is a Super Sticker event.
   */
  isSuperStickerEvent?: boolean | null;
  /**
   * The tier for the paid message, which is based on the amount of money spent to purchase the message.
   */
  messageType?: number | null;
  /**
   * If this event is a Super Sticker event, this field will contain metadata about the Super Sticker.
   */
  superStickerMetadata?: SuperStickerMetadata;
  /**
   * Details about the supporter.
   */
  supporterDetails?: ChannelProfileDetails;
}
export interface SuperStickerMetadata {
  /**
   * Internationalized alt text that describes the sticker image and any animation associated with it.
   */
  altText?: string | null;
  /**
   * Specifies the localization language in which the alt text is returned.
   */
  altTextLanguage?: string | null;
  /**
   * Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker.
   */
  stickerId?: string | null;
}
/**
 * A thumbnail is an image representing a YouTube resource.
 */
export interface Thumbnail {
  /**
   * (Optional) Height of the thumbnail image.
   */
  height?: number | null;
  /**
   * The thumbnail image&#39;s URL.
   */
  url?: string | null;
  /**
   * (Optional) Width of the thumbnail image.
   */
  width?: number | null;
}
/**
 * Internal representation of thumbnails for a YouTube resource.
 */
export interface ThumbnailDetails {
  /**
   * The default image for this resource.
   */
  default?: Thumbnail;
  /**
   * The high quality image for this resource.
   */
  high?: Thumbnail;
  /**
   * The maximum resolution quality image for this resource.
   */
  maxres?: Thumbnail;
  /**
   * The medium quality image for this resource.
   */
  medium?: Thumbnail;
  /**
   * The standard quality image for this resource.
   */
  standard?: Thumbnail;
}
export interface ThumbnailSetParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * Returns the Thumbnail with the given video IDs for Stubby or Apiary.
   */
  videoId?: string;

  /**
   * Request body metadata
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  requestBody?: {};

  /**
   * Media metadata
   */
  media?: {
    /**
     * Media mime-type
     */
    mimeType?: string;

    /**
     * Media body contents
     */
    body?: any;
  };
}
export interface ThumbnailSetResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of thumbnails.
   */
  items?: ThumbnailDetails[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#thumbnailSetResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Stub token pagination template to suppress results.
 */
export interface TokenPagination {}
/**
 * A &lt;code&gt;&lt;strong&gt;video&lt;/strong&gt;&lt;/code&gt; resource represents a YouTube video.
 */
export interface Video {
  /**
   * Age restriction details related to a video. This data can only be retrieved by the video owner.
   */
  ageGating?: VideoAgeGating;
  /**
   * The &lt;code&gt;contentDetails&lt;/code&gt; object contains information about the video content, including the length of the video and its aspect ratio.
   */
  contentDetails?: VideoContentDetails;
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The &lt;code&gt;fileDetails&lt;/code&gt; object encapsulates information about the video file that was uploaded to YouTube, including the file&#39;s resolution, duration, audio and video codecs, stream bitrates, and more. This data can only be retrieved by the video owner.
   */
  fileDetails?: VideoFileDetails;
  /**
   * The ID that YouTube uses to uniquely identify the video.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#video&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;liveStreamingDetails&lt;/code&gt; object contains metadata about a live video broadcast. The object will only be present in a &lt;code&gt;video&lt;/code&gt; resource if the video is an upcoming, live, or completed live broadcast.
   */
  liveStreamingDetails?: VideoLiveStreamingDetails;
  /**
   * The &lt;code&gt;localizations&lt;/code&gt; object contains localized versions of the basic details about the video, such as its title and description.
   */
  localizations?: {[key: string]: VideoLocalization} | null;
  /**
   * The &lt;code&gt;monetizationDetails&lt;/code&gt; object encapsulates information about the monetization status of the video.
   */
  monetizationDetails?: VideoMonetizationDetails;
  /**
   * The &lt;code&gt;player&lt;/code&gt; object contains information that you would use to play the video in an embedded player.
   */
  player?: VideoPlayer;
  /**
   * The &lt;code&gt;processingDetails&lt;/code&gt; object encapsulates information about YouTube&#39;s progress in processing the uploaded video file. The properties in the object identify the current processing status and an estimate of the time remaining until YouTube finishes processing the video. This part also indicates whether different types of data or content, such as file details or thumbnail images, are available for the video.&lt;br&gt;&lt;br&gt; The &lt;code&gt;processingProgress&lt;/code&gt; object is designed to be polled so that the video uploaded can track the progress that YouTube has made in processing the uploaded video file. This data can only be retrieved by the video owner.
   */
  processingDetails?: VideoProcessingDetails;
  /**
   * The &lt;code&gt;projectDetails&lt;/code&gt; object contains information about the project specific video metadata.
   */
  projectDetails?: VideoProjectDetails;
  /**
   * The &lt;code&gt;recordingDetails&lt;/code&gt; object encapsulates information about the location, date and address where the video was recorded.
   */
  recordingDetails?: VideoRecordingDetails;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the video, such as its title, description, and category.
   */
  snippet?: VideoSnippet;
  /**
   * The &lt;code&gt;statistics&lt;/code&gt; object contains statistics about the video.
   */
  statistics?: VideoStatistics;
  /**
   * The &lt;code&gt;status&lt;/code&gt; object contains information about the video&#39;s uploading, processing, and privacy statuses.
   */
  status?: VideoStatus;
  /**
   * The &lt;code&gt;suggestions&lt;/code&gt; object encapsulates suggestions that identify opportunities to improve the video quality or the metadata for the uploaded video. This data can only be retrieved by the video owner.
   */
  suggestions?: VideoSuggestions;
  /**
   * The &lt;code&gt;topicDetails&lt;/code&gt; object encapsulates information about &lt;a href=&quot;http://www.freebase.com&quot;&gt;Freebase&lt;/a&gt; topics associated with the video.
   */
  topicDetails?: VideoTopicDetails;
}
export interface VideoAbuseReport {
  /**
   * Additional comments regarding the abuse report.
   */
  comments?: string | null;
  /**
   * The language that the content was viewed in.
   */
  language?: string | null;
  /**
   * The high-level, or primary, reason that the content is abusive. The value is an abuse report reason ID.
   */
  reasonId?: string | null;
  /**
   * The specific, or secondary, reason that this content is abusive (if available). The value is an abuse report reason ID that is a valid secondary reason for the primary reason.
   */
  secondaryReasonId?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the video.
   */
  videoId?: string | null;
}
/**
 * A `__videoAbuseReportReason__` resource identifies a reason that a video could be reported as abusive. Video abuse report reasons are used with `video.ReportAbuse`.
 */
export interface VideoAbuseReportReason {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID of this abuse report reason.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string `&quot;youtube#videoAbuseReportReason&quot;`.
   */
  kind?: string | null;
  /**
   * The `snippet` object contains basic details about the abuse report reason.
   */
  snippet?: VideoAbuseReportReasonSnippet;
}
export interface VideoAbuseReportReasonListParameter
  extends StandardParameters {
  /**
   *
   */
  hl?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>videoCategory</code> resource parts that the API response will include. Supported values are <code>id</code> and <code>snippet</code>.
   */
  part?: string[];
}
export interface VideoAbuseReportReasonListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of valid abuse reasons that are used with `video.ReportAbuse`.
   */
  items?: VideoAbuseReportReason[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string `&quot;youtube#videoAbuseReportReasonListResponse&quot;`.
   */
  kind?: string | null;
  /**
   * The `visitorId` identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about a video category, such as its localized title.
 */
export interface VideoAbuseReportReasonSnippet {
  /**
   * The localized label belonging to this abuse report reason.
   */
  label?: string | null;
  /**
   * The secondary reasons associated with this reason, if any are available. (There might be 0 or more.)
   */
  secondaryReasons?: VideoAbuseReportSecondaryReason[];
}
export interface VideoAbuseReportSecondaryReason {
  /**
   * The ID of this abuse report secondary reason.
   */
  id?: string | null;
  /**
   * The localized label for this abuse report secondary reason.
   */
  label?: string | null;
}
export interface VideoAgeGating {
  /**
   * Indicates whether or not the video has alcoholic beverage content. Only users of legal purchasing age in a particular country, as identified by ICAP, can view the content.
   */
  alcoholContent?: boolean | null;
  /**
   * Age-restricted trailers. For redband trailers and adult-rated video-games. Only users aged 18+ can view the content. The the field is &lt;code&gt;true&lt;/code&gt; the content is restricted to viewers aged 18+. Otherwise The field won&#39;t be present.
   */
  restricted?: boolean | null;
  /**
   * Video game rating, if any.
   */
  videoGameRating?: string | null;
}
/**
 * A &lt;code&gt;&lt;strong&gt;videoCategory&lt;/strong&gt;&lt;/code&gt; resource identifies a category that has been or could be associated with uploaded videos.
 */
export interface VideoCategory {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the video category.
   */
  id?: string | null;
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#videoCategory&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;snippet&lt;/code&gt; object contains basic details about the video category, including its title.
   */
  snippet?: VideoCategorySnippet;
}
export interface VideoCategoryListParameter extends StandardParameters {
  /**
   *
   */
  hl?: string;
  /**
   * Returns the video categories with the given IDs for Stubby or Apiary.
   */
  id?: string[];
  /**
   * The <code><strong>part</strong></code> parameter specifies the <code>videoCategory</code> resource properties that the API response will include. Set the parameter value to <code>snippet</code>.
   */
  part?: string[];
  /**
   *
   */
  regionCode?: string;
}
export interface VideoCategoryListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of video categories that can be associated with YouTube videos. In this map, the video category ID is the map key, and its value is the corresponding &lt;code&gt;videoCategory&lt;/code&gt; resource.
   */
  items?: VideoCategory[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#videoCategoryListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Basic details about a video category, such as its localized title.
 */
export interface VideoCategorySnippet {
  assignable?: boolean | null;
  /**
   * The YouTube channel that created the video category.
   */
  channelId?: string | null;
  /**
   * The video category&#39;s title.
   */
  title?: string | null;
}
/**
 * Details about the content of a YouTube Video.
 */
export interface VideoContentDetails {
  /**
   * The value of &lt;code&gt;captions&lt;/code&gt; indicates whether the video has captions or not.
   */
  caption?: string | null;
  /**
   * Specifies the ratings that the video received under various rating schemes.
   */
  contentRating?: ContentRating;
  /**
   * The &lt;code&gt;countryRestriction&lt;/code&gt; object contains information about the countries where a video is (or is not) viewable.
   */
  countryRestriction?: AccessPolicy;
  /**
   * The value of &lt;code&gt;definition&lt;/code&gt; indicates whether the video is available in high definition or only in standard definition.
   */
  definition?: string | null;
  /**
   * The value of &lt;code&gt;dimension&lt;/code&gt; indicates whether the video is available in 3D or in 2D.
   */
  dimension?: string | null;
  /**
   * The length of the video. The tag value is an &lt;a href=&quot;//en.wikipedia.org/wiki/ISO_8601#Durations&quot;&gt;ISO 8601&lt;/a&gt; duration in the format &lt;code&gt;PT#M#S&lt;/code&gt;, in which the letters &lt;code&gt;PT&lt;/code&gt; indicate that the value specifies a period of time, and the letters &lt;code&gt;M&lt;/code&gt; and &lt;code&gt;S&lt;/code&gt; refer to length in minutes and seconds, respectively. The &lt;code&gt;#&lt;/code&gt; characters preceding the &lt;code&gt;M&lt;/code&gt; and &lt;code&gt;S&lt;/code&gt; letters are both integers that specify the number of minutes (or seconds) of the video. For example, a value of &lt;code&gt;PT15M51S&lt;/code&gt; indicates that the video is 15 minutes and 51 seconds long.
   */
  duration?: string | null;
  /**
   * Indicates whether the video uploader has provided a custom thumbnail image for the video. This property is only visible to the video uploader.
   */
  hasCustomThumbnail?: boolean | null;
  /**
   * The value of &lt;code&gt;is_license_content&lt;/code&gt; indicates whether the video is licensed content.
   */
  licensedContent?: boolean | null;
  /**
   * Specifies the projection format of the video.
   */
  projection?: string | null;
  /**
   * The &lt;code&gt;regionRestriction&lt;/code&gt; object contains information about the countries where a video is (or is not) viewable. The object will contain either the &lt;code&gt;contentDetails.regionRestriction.allowed&lt;/code&gt; property or the &lt;code&gt;contentDetails.regionRestriction.blocked&lt;/code&gt; property.
   */
  regionRestriction?: VideoContentDetailsRegionRestriction;
}
/**
 * DEPRECATED Region restriction of the video.
 */
export interface VideoContentDetailsRegionRestriction {
  /**
   * A list of region codes that identify countries where the video is viewable. If this property is present and a country is not listed in its value, then the video is blocked from appearing in that country. If this property is present and contains an empty list, the video is blocked in all countries.
   */
  allowed?: string[] | null;
  /**
   * A list of region codes that identify countries where the video is blocked. If this property is present and a country is not listed in its value, then the video is viewable in that country. If this property is present and contains an empty list, the video is viewable in all countries.
   */
  blocked?: string[] | null;
}
/**
 * Describes original video file properties, including technical details about audio and video streams, but also metadata information like content length, digitization time, or geotagging information.
 */
export interface VideoFileDetails {
  /**
   * A list of audio streams contained in the uploaded video file. Each item in the list contains detailed metadata about an audio stream.
   */
  audioStreams?: VideoFileDetailsAudioStream[];
  /**
   * The uploaded video file&#39;s combined (video and audio) bitrate in bits per second.
   */
  bitrateBps?: string | null;
  /**
   * The uploaded video file&#39;s container format.
   */
  container?: string | null;
  /**
   * The date and time when the uploaded video file was created. The value is specified in &lt;a href=&quot;http://www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format. Currently, the following ISO 8601 formats are supported: &lt;ul&gt; &lt;li&gt;Date only: &lt;code&gt;YYYY-MM-DD&lt;/code&gt;&lt;/li&gt; &lt;li&gt;Naive time: &lt;code&gt;YYYY-MM-DDTHH:MM:SS&lt;/code&gt;&lt;/li&gt; &lt;li&gt;Time with timezone: &lt;code&gt;YYYY-MM-DDTHH:MM:SS+HH:MM&lt;/code&gt;&lt;/li&gt; &lt;/ul&gt;
   */
  creationTime?: string | null;
  /**
   * The length of the uploaded video in milliseconds.
   */
  durationMs?: string | null;
  /**
   * The uploaded file&#39;s name. This field is present whether a video file or another type of file was uploaded.
   */
  fileName?: string | null;
  /**
   * The uploaded file&#39;s size in bytes. This field is present whether a video file or another type of file was uploaded.
   */
  fileSize?: string | null;
  /**
   * The uploaded file&#39;s type as detected by YouTube&#39;s video processing engine. Currently, YouTube only processes video files, but this field is present whether a video file or another type of file was uploaded.
   */
  fileType?: string | null;
  /**
   * A list of video streams contained in the uploaded video file. Each item in the list contains detailed metadata about a video stream.
   */
  videoStreams?: VideoFileDetailsVideoStream[];
}
/**
 * Information about an audio stream.
 */
export interface VideoFileDetailsAudioStream {
  /**
   * The audio stream&#39;s bitrate, in bits per second.
   */
  bitrateBps?: string | null;
  /**
   * The number of audio channels that the stream contains.
   */
  channelCount?: number | null;
  /**
   * The audio codec that the stream uses.
   */
  codec?: string | null;
  /**
   * A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.
   */
  vendor?: string | null;
}
/**
 * Information about a video stream.
 */
export interface VideoFileDetailsVideoStream {
  /**
   * The video content&#39;s display aspect ratio, which specifies the aspect ratio in which the video should be displayed.
   */
  aspectRatio?: number | null;
  /**
   * The video stream&#39;s bitrate, in bits per second.
   */
  bitrateBps?: string | null;
  /**
   * The video codec that the stream uses.
   */
  codec?: string | null;
  /**
   * The video stream&#39;s frame rate, in frames per second.
   */
  frameRateFps?: number | null;
  /**
   * The encoded video content&#39;s height in pixels.
   */
  heightPixels?: number | null;
  /**
   * The amount that YouTube needs to rotate the original source content to properly display the video.
   */
  rotation?: string | null;
  /**
   * A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.
   */
  vendor?: string | null;
  /**
   * The encoded video content&#39;s width in pixels. You can calculate the video&#39;s encoding aspect ratio as &lt;code&gt;width_pixels&lt;/code&gt;&amp;nbsp;/&amp;nbsp;&lt;code&gt;height_pixels&lt;/code&gt;.
   */
  widthPixels?: number | null;
}
export interface VideoDeleteParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}
export interface VideoInsertParameter extends StandardParameters {
  /**
   * Should auto-levels be applied to the upload.
   */
  autoLevels?: boolean;
  /**
   * Notify the channel subscribers about the new video. As default, the notification is enabled.
   */
  notifySubscribers?: boolean;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * This parameter can only be used in a properly <a href="/youtube/v3/guides/authentication">authorized request</a>. <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwnerChannel</strong></code> parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a value for the <code>onBehalfOfContentOwner</code> parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that is linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies. Finally, the channel that the <code>onBehalfOfContentOwnerChannel</code> parameter value specifies must be linked to the content owner that the <code>onBehalfOfContentOwner</code> parameter specifies.<br><br>This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide authentication credentials for each separate channel.
   */
  onBehalfOfContentOwnerChannel?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br/><br/>Note that not all parts contain properties that can be set when inserting or updating a video. For example, the <code>statistics</code> object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a <code>part</code> that does not contain mutable values, that <code>part</code> will still be included in the API response.
   */
  part?: string[];
  /**
   * Should stabilize be applied to the upload.
   */
  stabilize?: boolean;

  /**
   * Request body metadata
   */
  requestBody?: Video;

  /**
   * Media metadata
   */
  media?: {
    /**
     * Media mime-type
     */
    mimeType?: string;

    /**
     * Media body contents
     */
    body?: any;
  };
}
export interface VideoListParameter extends StandardParameters {
  /**
   * Return the videos that are in the specified chart.
   */
  chart?: string;
  /**
   * Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX).
   */
  hl?: string;
  /**
   * Return videos with the given ids.
   */
  id?: string[];
  /**
   *
   */
  locale?: string;
  /**
   *
   */
  maxHeight?: number;
  /**
   * The <code><strong>maxResults</strong></code> parameter specifies the maximum number of items that should be returned in the result set.<br><br><strong>Note:</strong> This parameter is supported for use in conjunction with the <code><a href="#myRating">myRating</a></code> and <code><a href="#chart">chart</a></code> parameters, but it is not supported for use in conjunction with the <code><a href="#id">id</a></code> parameter.
   */
  maxResults?: number;
  /**
   * Return the player with maximum height specified in
   */
  maxWidth?: number;
  /**
   * Return videos liked/disliked by the authenticated user. Does not support RateType.RATED_TYPE_NONE.
   */
  myRating?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>pageToken</strong></code> parameter identifies a specific page in the result set that should be returned. In an API response, the <code>nextPageToken</code> and <code>prevPageToken</code> properties identify other pages that could be retrieved.<br><br><strong>Note:</strong> This parameter is supported for use in conjunction with the <code><a href="#myRating">myRating</a></code> and <code><a href="#chart">chart</a></code> parameters, but it is not supported for use in conjunction with the <code><a href="#id">id</a></code> parameter.
   */
  pageToken?: string;
  /**
   * The <code><strong>part</strong></code> parameter specifies a comma-separated list of one or more <code>video</code> resource properties that the API response will include.<br><br>If the parameter identifies a property that contains child properties, the child properties will be included in the response. For example, in a <code>video</code> resource, the <code>snippet</code> property contains the <code>channelId</code>, <code>title</code>, <code>description</code>, <code>tags</code>, and <code>categoryId</code> properties. As such, if you set <code><strong>part=snippet</strong></code>, the API response will contain all of those properties.
   */
  part?: string[];
  /**
   * Use a chart that is specific to the specified region
   */
  regionCode?: string;
  /**
   * Use chart that is specific to the specified video category
   */
  videoCategoryId?: string;
}
export interface VideoSetRatingParameter extends StandardParameters {
  /**
   *
   */
  id?: string;
  /**
   *
   */
  rating?: string;
}
export interface VideoReportAbuseParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;

  /**
   * Request body metadata
   */
  requestBody?: VideoAbuseReport;
}
export interface VideoUpdateParameter extends StandardParameters {
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * The <code><strong>part</strong></code> parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will include.<br/><br/>Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a video's privacy setting is contained in the <code>status</code> part. As such, if your request is updating a private video, and the request's <code>part</code> parameter value includes the <code>status</code> part, the video's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the video will revert to the default privacy setting.<br/><br/>In addition, not all parts contain properties that can be set when inserting or updating a video. For example, the <code>statistics</code> object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a <code>part</code> that does not contain mutable values, that <code>part</code> will still be included in the API response.
   */
  part?: string[];

  /**
   * Request body metadata
   */
  requestBody?: Video;
}
export interface VideoInsertResponse extends Video {}
export interface VideoUpdateResponse extends Video {}
export interface VideoListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  items?: Video[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#videoListResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the next page in the result set.
   */
  nextPageToken?: string | null;
  /**
   * General pagination information.
   */
  pageInfo?: PageInfo;
  /**
   * The token that can be used as the value of the &lt;code&gt;pageToken&lt;/code&gt; parameter to retrieve the previous page in the result set.
   */
  prevPageToken?: string | null;
  tokenPagination?: TokenPagination;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Details about the live streaming metadata.
 */
export interface VideoLiveStreamingDetails {
  /**
   * The ID of the currently active live chat attached to this video. This field is filled only if the video is a currently live broadcast that has live chat. Once the broadcast transitions to complete this field will be removed and the live chat closed down. For persistent broadcasts that live chat id will no longer be tied to this video but rather to the new video being displayed at the persistent page.
   */
  activeLiveChatId?: string | null;
  /**
   * The time that the broadcast actually ended. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format. This value will not be available until the broadcast is over.
   */
  actualEndTime?: string | null;
  /**
   * The time that the broadcast actually started. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format. This value will not be available until the broadcast begins.
   */
  actualStartTime?: string | null;
  /**
   * The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended.
   */
  concurrentViewers?: string | null;
  /**
   * The time that the broadcast is scheduled to end. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format. If the value is empty or the property is not present, then the broadcast is scheduled to continue indefinitely.
   */
  scheduledEndTime?: string | null;
  /**
   * The time that the broadcast is scheduled to begin. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  scheduledStartTime?: string | null;
}
/**
 * Localized versions of certain video properties (e.g. title).
 */
export interface VideoLocalization {
  /**
   * Localized version of the video&#39;s description.
   */
  description?: string | null;
  /**
   * Localized version of the video&#39;s title.
   */
  title?: string | null;
}
/**
 * Details about monetization of a YouTube Video.
 */
export interface VideoMonetizationDetails {
  /**
   * The value of &lt;code&gt;access&lt;/code&gt; indicates whether the video can be monetized or not.
   */
  access?: AccessPolicy;
}
/**
 * Player to be used for a video playback.
 */
export interface VideoPlayer {
  embedHeight?: string | null;
  /**
   * An &lt;code&gt;&amp;lt;iframe&amp;gt;&lt;/code&gt; tag that embeds a player that will play the video.
   */
  embedHtml?: string | null;
  /**
   * The embed width
   */
  embedWidth?: string | null;
}
/**
 * Describes processing status and progress and availability of some other Video resource parts.
 */
export interface VideoProcessingDetails {
  /**
   * This value indicates whether video editing suggestions, which might improve video quality or the playback experience, are available for the video. You can retrieve these suggestions by requesting the &lt;code&gt;suggestions&lt;/code&gt; part in your &lt;code&gt;videos.list()&lt;/code&gt; request.
   */
  editorSuggestionsAvailability?: string | null;
  /**
   * This value indicates whether file details are available for the uploaded video. You can retrieve a video&#39;s file details by requesting the &lt;code&gt;fileDetails&lt;/code&gt; part in your &lt;code&gt;videos.list()&lt;/code&gt; request.
   */
  fileDetailsAvailability?: string | null;
  /**
   * The reason that YouTube failed to process the video. This property will only have a value if the &lt;code&gt;processingStatus&lt;/code&gt; property&#39;s value is &lt;code&gt;failed&lt;/code&gt;.
   */
  processingFailureReason?: string | null;
  /**
   * This value indicates whether the video processing engine has generated suggestions that might improve YouTube&#39;s ability to process the the video, warnings that explain video processing problems, or errors that cause video processing problems. You can retrieve these suggestions by requesting the &lt;code&gt;suggestions&lt;/code&gt; part in your &lt;code&gt;videos.list()&lt;/code&gt; request.
   */
  processingIssuesAvailability?: string | null;
  /**
   * The &lt;code&gt;processingProgress&lt;/code&gt; object contains information about the progress YouTube has made in processing the video. The values are really only relevant if the video&#39;s processing status is &lt;code&gt;processing&lt;/code&gt;.
   */
  processingProgress?: VideoProcessingDetailsProcessingProgress;
  /**
   * The video&#39;s processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.
   */
  processingStatus?: string | null;
  /**
   * This value indicates whether keyword (tag) suggestions are available for the video. Tags can be added to a video&#39;s metadata to make it easier for other users to find the video. You can retrieve these suggestions by requesting the &lt;code&gt;suggestions&lt;/code&gt; part in your &lt;code&gt;videos.list()&lt;/code&gt; request.
   */
  tagSuggestionsAvailability?: string | null;
  /**
   * This value indicates whether thumbnail images have been generated for the video.
   */
  thumbnailsAvailability?: string | null;
}
/**
 * Video processing progress and completion time estimate.
 */
export interface VideoProcessingDetailsProcessingProgress {
  /**
   * The number of parts of the video that YouTube has already processed. You can estimate the percentage of the video that YouTube has already processed by calculating:&lt;br&gt; &lt;code&gt;100 * parts_processed / parts_total&lt;/code&gt;&lt;br&gt;&lt;br&gt; Note that since the estimated number of parts could increase without a corresponding increase in the number of parts that have already been processed, it is possible that the calculated progress could periodically decrease while YouTube processes a video.
   */
  partsProcessed?: string | null;
  /**
   * An estimate of the total number of parts that need to be processed for the video. The number may be updated with more precise estimates while YouTube processes the video.
   */
  partsTotal?: string | null;
  /**
   * An estimate of the amount of time, in millseconds, that YouTube needs to finish processing the video.
   */
  timeLeftMs?: string | null;
}
/**
 * Project specific details about the content of a YouTube Video.
 */
export interface VideoProjectDetails {
  /**
   * A list of project tags associated with the video during the upload.
   */
  tags?: string[] | null;
}
/**
 * Basic details about rating of a video.
 */
export interface VideoRating {
  /**
   * Rating of a video.
   */
  rating?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the video.
   */
  videoId?: string | null;
}
export interface VideoRatingListParameter extends StandardParameters {
  /**
   *
   */
  id?: string[];
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}
export interface VideoRatingListResponse {
  /**
   * Etag of this resource.
   */
  etag?: string | null;
  /**
   * Serialized EventId of the request which produced this response.
   */
  eventId?: string | null;
  /**
   * A list of ratings that match the request criteria.
   */
  items?: VideoRating[];
  /**
   * Identifies what kind of resource this is. Value: the fixed string &lt;code&gt;&quot;youtube#videoGetRatingResponse&quot;&lt;/code&gt;.
   */
  kind?: string | null;
  /**
   * The &lt;code&gt;visitorId&lt;/code&gt; identifies the visitor.
   */
  visitorId?: string | null;
}
/**
 * Recording information associated with the video.
 */
export interface VideoRecordingDetails {
  /**
   * The geolocation information associated with the video.
   */
  location?: GeoPoint;
  /**
   * The text description of the location where the video was recorded.
   */
  locationDescription?: string | null;
  /**
   * The date and time when the video was recorded. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; (&lt;code&gt;YYYY-MM-DDThh:mm:ss.sssZ&lt;/code&gt;) format.
   */
  recordingDate?: string | null;
}
/**
 * Basic details about a video, including title, description, uploader, thumbnails and category.
 */
export interface VideoSnippet {
  /**
   * The YouTube &lt;a href=&quot;/youtube/v3/docs/videoCategories/list&quot;&gt;video category&lt;/a&gt; associated with the video.
   */
  categoryId?: string | null;
  /**
   * The ID that YouTube uses to uniquely identify the channel that the video was uploaded to.
   */
  channelId?: string | null;
  /**
   * Channel title for the channel that the video belongs to.
   */
  channelTitle?: string | null;
  /**
   * The &lt;code&gt;default_audio_language&lt;/code&gt; property specifies the language spoken in the video&#39;s default audio track.
   */
  defaultAudioLanguage?: string | null;
  /**
   * The language of the videos&#39;s default snippet.
   */
  defaultLanguage?: string | null;
  /**
   * The video&#39;s description. @mutable youtube.videos.insert youtube.videos.update
   */
  description?: string | null;
  /**
   * Indicates if the video is an upcoming/active live broadcast. Or it&#39;s &quot;none&quot; if the video is not an upcoming/active live broadcast.
   */
  liveBroadcastContent?: string | null;
  /**
   * Localized snippet selected with the hl parameter. If no such localization exists, this field is populated with the default snippet. (Read-only)
   */
  localized?: VideoLocalization;
  /**
   * The date and time that the video was uploaded. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishedAt?: string | null;
  /**
   * A list of keyword tags associated with the video. Tags may contain spaces.
   */
  tags?: string[] | null;
  /**
   * A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /**
   * The video&#39;s title. @mutable youtube.videos.insert youtube.videos.update
   */
  title?: string | null;
}
/**
 * Statistics about the video, such as the number of times the video was viewed or liked.
 */
export interface VideoStatistics {
  /**
   * The number of comments for the video.
   */
  commentCount?: string | null;
  /**
   * The number of users who have indicated that they disliked the video by giving it a negative rating.
   */
  dislikeCount?: string | null;
  /**
   * The number of users who currently have the video marked as a favorite video.
   */
  favoriteCount?: string | null;
  /**
   * The number of users who have indicated that they liked the video by giving it a positive rating.
   */
  likeCount?: string | null;
  /**
   * The number of times the video has been viewed.
   */
  viewCount?: string | null;
}
/**
 * Basic details about a video category, such as its localized title. Next Id: 16
 */
export interface VideoStatus {
  /**
   * This value indicates if the video can be embedded on another website. @mutable youtube.videos.insert youtube.videos.update
   */
  embeddable?: boolean | null;
  /**
   * This value explains why a video failed to upload. This property is only present if the &lt;code&gt;uploadStatus&lt;/code&gt; property indicates that the upload failed.
   */
  failureReason?: string | null;
  /**
   * The video&#39;s license. @mutable youtube.videos.insert youtube.videos.update
   */
  license?: string | null;
  madeForKids?: boolean | null;
  /**
   * The video&#39;s privacy status.
   */
  privacyStatus?: string | null;
  /**
   * This value indicates if the extended video statistics on the watch page can be viewed by everyone. Note that the view count, likes, etc will still be visible if this is disabled. @mutable youtube.videos.insert youtube.videos.update
   */
  publicStatsViewable?: boolean | null;
  /**
   * The date and time when the video is scheduled to publish. It can be set only if the privacy status of the video is private. The value is specified in &lt;a href=&quot;//www.w3.org/TR/NOTE-datetime&quot;&gt;ISO 8601&lt;/a&gt; format.
   */
  publishAt?: string | null;
  /**
   * This value explains why YouTube rejected an uploaded video. This property is only present if the &lt;code&gt;uploadStatus&lt;/code&gt; property indicates that the upload was rejected.
   */
  rejectionReason?: string | null;
  selfDeclaredMadeForKids?: boolean | null;
  /**
   * The status of the uploaded video.
   */
  uploadStatus?: string | null;
}
/**
 * Specifies suggestions on how to improve video content, including encoding hints, tag suggestions, and editor suggestions.
 */
export interface VideoSuggestions {
  /**
   * A list of video editing operations that might improve the video quality or playback experience of the uploaded video.
   */
  editorSuggestions?: string[] | null;
  /**
   * A list of errors that will prevent YouTube from successfully processing the uploaded video video. These errors indicate that, regardless of the video&#39;s current &lt;a href=&quot;#processingProgress.processingStatus&quot;&gt;processing status&lt;/a&gt;, eventually, that status will almost certainly be &lt;code&gt;failed&lt;/code&gt;.
   */
  processingErrors?: string[] | null;
  /**
   * A list of suggestions that may improve YouTube&#39;s ability to process the video.
   */
  processingHints?: string[] | null;
  /**
   * A list of reasons why YouTube may have difficulty transcoding the uploaded video or that might result in an erroneous transcoding. These warnings are generated before YouTube actually processes the uploaded video file. In addition, they identify issues that are unlikely to cause the video processing to fail but that might cause problems such as sync issues, video artifacts, or a missing audio track.
   */
  processingWarnings?: string[] | null;
  /**
   * A list of keyword tags that could be added to the video&#39;s metadata to increase the likelihood that users will locate your video when searching or browsing on YouTube.
   */
  tagSuggestions?: VideoSuggestionsTagSuggestion[];
}
/**
 * A single tag suggestion with it&#39;s relevance information.
 */
export interface VideoSuggestionsTagSuggestion {
  /**
   * A set of video categories for which the tag is relevant. You can use this information to display appropriate tag suggestions based on the video category that the video uploader associates with the video. By default, tag suggestions are relevant for all categories if there are no restricts defined for the keyword.
   */
  categoryRestricts?: string[] | null;
  /**
   * The keyword tag suggested for the video.
   */
  tag?: string | null;
}
/**
 * Freebase topic information related to the video.
 */
export interface VideoTopicDetails {
  /**
   * Similar to topic_id, except that these topics are merely relevant to the video. These are topics that may be mentioned in, or appear in the video. You can retrieve information about each topic using &lt;a href=&quot;http://wiki.freebase.com/wiki/Topic_API&quot;&gt;Freebase Topic API&lt;/a&gt;.
   */
  relevantTopicIds?: string[] | null;
  /**
   * A list of Wikipedia URLs that provide a high-level description of the video&#39;s content.
   */
  topicCategories?: string[] | null;
  /**
   * A list of Freebase topic IDs that are centrally associated with the video. These are topics that are centrally featured in the video, and it can be said that the video is mainly about each of these. You can retrieve information about each topic using the &lt; a href=&quot;http://wiki.freebase.com/wiki/Topic_API&quot;&gt;Freebase Topic API&lt;/a&gt;.
   */
  topicIds?: string[] | null;
}
/**
 * Branding properties for the watch. All deprecated.
 */
export interface WatchSettings {
  /**
   * The text color for the video watch page&#39;s branded area.
   */
  backgroundColor?: string | null;
  /**
   * An ID that uniquely identifies a playlist that displays next to the video player.
   */
  featuredPlaylistId?: string | null;
  /**
   * The background color for the video watch page&#39;s branded area.
   */
  textColor?: string | null;
}

export interface WatermarkSetParameter extends StandardParameters {
  /**
   *
   */
  channelId?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;

  /**
   * Request body metadata
   */
  requestBody?: InvideoBranding;

  /**
   * Media metadata
   */
  media?: {
    /**
     * Media mime-type
     */
    mimeType?: string;

    /**
     * Media body contents
     */
    body?: any;
  };
}
export interface WatermarkUnsetParameter extends StandardParameters {
  /**
   *
   */
  channelId?: string;
  /**
   * <strong>Note:</strong> This parameter is intended exclusively for YouTube content partners.<br><br>The <code><strong>onBehalfOfContentOwner</strong></code> parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
}
