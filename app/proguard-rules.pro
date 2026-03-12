# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /sdk/tools/proguard/proguard-android.txt

# Keep data classes
-keep class com.nomospace.wordwonderkids.data.model.** { *; }

# Keep Room entities
-keep class com.nomospace.wordwonderkids.data.local.entity.** { *; }

# Keep enum classes
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}
