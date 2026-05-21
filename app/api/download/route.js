import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('url');
  const type = searchParams.get('type') || 'video'; // ឆែកមើលថារូបភាពឬវីដេអូ
  const index = searchParams.get('index') || '1';

  if (!fileUrl) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  }

  try {
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 💡 កំណត់ឈ្មោះ និងប្រភេទឯកសារទៅតាមអ្វីដែលអ្នកប្រើចង់បាន
    const contentType = type === 'image' ? 'image/jpeg' : 'video/mp4';
    const filename = type === 'image' ? `tiktok_wallpaper_${index}.jpg` : 'tiktok_video_no_watermark.mp4';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}