import { prisma } from '$lib/prisma';

export async function getAllSubmissions() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return submissions.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      message: s.message,
      createdAt: s.createdAt
    }));
  } catch (err) {
    console.error('Error fetching submissions:', err);
    throw new Error('Failed to load submissions');
  }
}


export async function getSubmissionById(id: number) {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id }
    });

    if (!submission) {
      return null; 
    }

    return {
      id: submission.id,
      name: submission.name,
      email: submission.email,
      message: submission.message,
      createdAt: submission.createdAt
    };
  } catch (err) {
    console.error(`Error fetching submission with id ${id}:`, err);
    throw new Error('Failed to load submission');
  }
}

export async function deleteSubmissionById(id: number) {
  try {
    await prisma.submission.delete({
      where: { id }
    });

    return { success: true };
  } catch (err) {
    console.error('Error deleting submission:', err);
    throw new Error('Failed to delete submission');
  }
}
export async function addSubmission(data: { name: string; email: string; message: string }) {
    return await prisma.submission.create({
        data
    });
}